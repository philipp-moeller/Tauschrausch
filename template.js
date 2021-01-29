const fs = require('fs');

class Template {
	constructor(filename,vars) {
		if (typeof(fs)!='undefined' && fs.existsSync(filename)) {
			this.raw = fs.readFileSync(filename).toString().replace(/(\r\n|\r|\n|\t)/g,'');
			this.vars = vars;
		}
		else {
			this.raw = '';
			this.vars = {};
		}
	}

	async value(bracket) {
		var sequence = bracket.replace(/\{|\}|\?|\!|\~/g,'').split('.');
		var name = sequence.shift();
		if (typeof(this.vars[name])!='undefined') {
			var value = this.vars[name];
			while (sequence.length>0) {
				var attr = sequence.shift();
				if (typeof(value)=='object' && typeof(value[attr])=='function') {
					if (value[attr].constructor.name=='AsyncFunction')
						value = await value[attr]();
					else
						value = value[attr]();
				}
				else if (typeof(value)=='object' && typeof(value[attr])!='undefined') {
					value = value[attr];
				}
				else
					value = '';
			}
			return (value==null) ? '' : value;
		}
		else
			return '';
	}

	async parseElements(elements) {
		var parsed = '';
		while (elements.length>0) {
			var scope = elements.shift();
			if (scope.match(/^\{\{\w[\w\.\/\:\-]+\}\}$/)) {
				parsed += await this.value(scope);
			}
			else if (scope.match(/^\{\{\?\!?[\w\.]+\}\}$/)) {
				var conditional = [scope];
				var elsePosition = 0;
				var openTags = 1;
				while (openTags>0) {
					scope = elements.shift();
					if (scope.match(/^\{\{\?\!?[\w\.]+\}\}$/))
						openTags++;
					else if (scope=='{{:?}}' && openTags==1)
						elsePosition = conditional.length;
					else if (scope=='{{/?}}')
						openTags--;
					conditional.push(scope);
				}
				if (Boolean(await this.value(conditional[0]))==(conditional[0].indexOf('!')==-1))
					parsed += await this.parseElements(conditional.slice(1,(elsePosition==0) ? -1 : elsePosition));
				else if (elsePosition!=0)
					parsed += await this.parseElements(conditional.slice(elsePosition+1,-1));
			}
			else if (scope.match(/^\{\{\~[\w\.]+\}\}$/)) {
				var loop = [scope];
				var openTags = 1;
				while (openTags>0) {
					scope = elements.shift();
					if (scope.match(/^\{\{\~[\w\.]+\}\}$/))
						openTags++;
					else if (scope=='{{/~}}')
						openTags--;
					loop.push(scope);
				}
				var loopKey = loop[0].replace(/\{|\}|\~/g,'');
				var loopValue = await this.value(loop[0]);
				if (Array.isArray(loopValue)) {
					for (var i=0; i<loopValue.length; i++) {
						parsed += await this.parseElements(loop.slice(1,-1).map(function(str) {
							if (str.slice(0,2)=='{{' && str.slice(-2)=='}}')
								return str.replace(loopKey,loopKey+'.'+i);
							else
								return str;
						}));
					}
				}
			}
			else
				parsed += scope;
		}
		return parsed;
	}

	async parse() {
		var elements = this.raw.split(/(\{\{[\w\.\!\?\~\:\/\-]+\}\})/g);
		return await this.parseElements(elements);
	}

	toString() {
		return this.raw;
	}
}

module.exports = Template;
