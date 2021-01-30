const db = require('./config.js');

function date2str(date,format='Y-m-d H:i:s') {
	let y = date.getFullYear();
	let m = ("0" + (date.getMonth() + 1)).slice(-2);
	let d = ("0" + date.getDate()).slice(-2);
	let h = ("0" + date.getHours()).slice(-2);
	let i = ("0" + date.getMinutes()).slice(-2);
	let s = ("0" + date.getSeconds()).slice(-2);
	return format.replace('Y',y).replace('m',m).replace('d',d).replace('H',h).replace('i',i).replace('s',s);
}

module.exports = class {
	constructor(table,id=0) {
		this.id = isNaN(id) ? 0 : id;
		this.dbData = {
			table: table,
			row: {}
		};
	}

	async init() {
		await this.dbRead();
		this.readAttributes();
	}

	get exists() {
		return this.id>0;
	}

	get classname() {
		return this.constructor.name;
	}

	get descriptor() {
		return this.dbData.table+'/'+this.id;
	}

	async save() {
		this.writeAttributes();
		return await this.dbWrite();
	}

	async delete() {
		return await this.dbDelete();
	}

	composeFrom(origin) {
		for (var key in origin) {
			if (typeof(origin[key])!='undefined')
				this[key] = origin[key];
		}
	}

	decompose() {
		var toObject = Object.assign({},this);
		return toObject;
	}

	readAttributes() {
		this.composeFrom(this.dbData.row);
	}

	writeAttributes() {
		var items = this.decompose();
		for (var key in this.dbData.row) {
			this.dbData.row[key] = items[key];
		}
	}

  async dbCheckTable() {
		var sql = 'SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name="'+this.dbData.table+'"';
		if (process.argv.indexOf('-sql')!=-1)
			console.log('\x1b[34mSQL-Query: '+sql+'\x1b[0m');
		var rows = await db.query(sql);
		if (Number(rows[0].count)==0)
			throw new Error('there is no table named "'+this.dbData.table+'" in database, try to run `node meta/repair_database.js`');
  }

  async dbRead() {
		var sql = 'SELECT * FROM '+this.dbData.table+' WHERE id='+Number(this.id);
		if (process.argv.indexOf('-sql')!=-1)
			console.log('\x1b[34mSQL-Query: '+sql+'\x1b[0m');
		var rows = await db.query(sql);
		if (rows.length>0)
			this.dbData.row = Object.assign({},rows[0]);
		else {
			await this.dbDefault();
		}
  }

	async dbDefault() {
		var sql = 'SHOW COLUMNS FROM '+this.dbData.table;
		if (process.argv.indexOf('-sql')!=-1)
			console.log('\x1b[34mSQL-Query: '+sql+'\x1b[0m');
		var cols = await db.query(sql);
		this.dbData.row = {};
		for (var col of cols) {
			var type = col.Type.split('(').shift();
			switch (type) {
				case 'int':
				case 'decimal':
					if (col.Default==null)
						this.dbData.row[col.Field] = null;
					else
						this.dbData.row[col.Field] = Number(col.Default);
					break;
				case 'tinyint':
					this.dbData.row[col.Field] = Boolean(Number(col.Default));
					break;
				case 'datetime':
					if (col.Default=='CURRENT_TIMESTAMP')
						this.dbData.row[col.Field] = date2str(new Date());
					else
						this.dbData.row[col.Field] = col.Default;
					break;
				default:
					this.dbData.row[col.Field] = col.Default;
			}
		}
	}

	async dbWrite() {
		var keys = Object.keys(this.dbData.row).slice(1);
		if (this.id>0) {
			var sets = [];
			for (var key of keys) {
				if (this.dbData.row[key]==null || this.dbData.row[key]=='NULL')
					sets.push(key+'=NULL');
				else {
					switch (typeof(this.dbData.row[key])) {
						case 'number':
							sets.push('`'+key+'`='+Number(this.dbData.row[key])+'');
							break;
						case 'boolean':
							sets.push('`'+key+'`='+(this.dbData.row[key] ? 1 : 0)+'');
							break;
						default:
							sets.push('`'+key+'`="'+this.dbData.row[key].toString().replace('"','\\\"')+'"');
					}
				}
			}
			try {
				var sql = 'UPDATE `'+this.dbData.table+'` SET '+sets.join(', ')+' WHERE `id`='+this.id;
				if (process.argv.indexOf('-sql')!=-1)
					console.log('\x1b[34mSQL-Query: '+sql+'\x1b[0m');
				var res = await db.query(sql);
				return true;
			}
			catch(err) {
				console.log('\x1b[33mSQL-Error: "'+err.sqlMessage+'" in "'+err.sql+'"\x1b[0m');
				return false;
			}
		}
		else {
			var values = [];
			for (var key of keys) {
				if (this.dbData.row[key]==null || this.dbData.row[key]=='NULL')
					values.push('NULL');
				else {
					switch (typeof(this.dbData.row[key])) {
						case 'number':
							values.push(Number(this.dbData.row[key]));
							break;
						case 'boolean':
							values.push(this.dbData.row[key] ? 1 : 0);
							break;
						default:
							values.push('"'+this.dbData.row[key].toString().replace('"','\\\"')+'"');
					}
				}
			}
			try {
				var sql = 'INSERT INTO `'+this.dbData.table+'` (`'+keys.join('`, `')+'`) VALUES ('+values.join(', ')+')';
				if (process.argv.indexOf('-sql')!=-1)
					console.log('\x1b[34mSQL-Query: '+sql+'\x1b[0m');
				var res = await db.query(sql);
				this.id = res.insertId;
				return true;
			}
			catch(err) {
				console.log('\x1b[33mSQL-Error: "'+err.sqlMessage+'" in "'+err.sql+'"\x1b[0m');
				return false;
			}
		}
	}

	async dbDelete() {
		try {
			var sql = 'DELETE FROM `'+this.dbData.table+'` WHERE `id`='+Number(this.id);
			if (process.argv.indexOf('-sql')!=-1)
				console.log('\x1b[34mSQL-Query: '+sql+'\x1b[0m');
			var res = await db.query(sql);
			return res.affectedRows>0;
		}
		catch(err) {
			console.log('\x1b[33mSQL-Error: "'+err.sqlMessage+'" in "'+err.sql+'"\x1b[0m');
			return false;
		}
	}

}
