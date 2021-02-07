// THIS BRANCH IS A EXPERIMENTAL VERSION OF THE MAIN PROJECT

const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

const port = process.env.PORT || 8000; // ! change port, when Error occurred (process.env.PORT -> choose enviromental standart port)

// put local IP-Adress for server out
const dns = require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('Access server at: ' + add + ':' + port + '/' );
});

http.createServer(async function (req, res) {

	var requestTime = new Date().getTime();

	// read http.request headers
	// In diesem Teil des Programms werden wichtige Informationen aus der
	// Anfrage (z. B. Pfad, Cookies etc.) in Variablen geladen
	var host = req.headers.host.split(':');
	var url = req.url.split('?');
	var path = url[0].substr(1).split('/');
	var method = req.method.toUpperCase();
	var query = {}
	if (url.length>1)
		query = querystring.parse(url[1]);
	var cookies = {};
	if (typeof(req.headers.cookie)!='undefined') {
		var rawCookies = req.headers.cookie.split('; ');
		for (cookie of rawCookies) {
			var cookieData = cookie.split('=');
			cookies[cookieData[0]] = cookieData[1];
		}
	}

	// prepare http.response
	// Dieser Teil bereitet die Antwortstruktur des Servers vor.
	var httpStatus = 200;
	var httpHeaders = {'Content-Type': 'text/html'};
	var httpContent = '';

	// read http.request body
	var body = '';
	req.on('error',function(err) {
		httpStatus = 500;
	});
	req.on('data',function(chunk) {
		body += chunk.toString();
	});
	req.on('end',async function() {

		// generate http.response
		// "This is where the real magic happens." :)
		switch (path[0]) {
			case 'script':
				// Anfragen an einen Pfad "/script/..." werden mit einem Javascript aus
				// dem Ordner "/script" beantwortet
				if (method=='GET' && fs.existsSync('./'+path.join('/'))) {
					httpHeaders['Content-Type'] = 'application/javascript';
					httpContent = fs.readFileSync('.'+path.join('/'));
				}
				else { httpStatus = 404; }
				break;
			case 'css':
				// Anfragen an einen Pfad "/css/..." werden mit einem Stylesheet aus
				// dem Ordner "/css" beantwortet
				if (method=='GET' && fs.existsSync('./'+path.join('/'))) {
					httpHeaders['Content-Type'] = 'text/css';
					httpContent = fs.readFileSync('.'+path.join('/'));
				}
				else { httpStatus = 404; }
				break;
			case 'img':
				// Anfragen an einen Pfad "/img/..." werden mit einem Bild (jpg oder
				// png) aus dem Ordner "/img" beantwortet
				var fname = path[path.length-1].split('.');
				if (method=='GET' && fs.existsSync('./'+path.join('/')) && fname.length>1) {
					var file = fs.readFileSync('./'+path.join('/'));
					const mimeTypes = {
						'png': 'image/png',
						'jpg': 'image/jpeg',
						'jpeg': 'image/jpeg'
					};
					httpHeaders['Content-Type'] = mimeTypes[fname[1]];
					httpContent = file;
				}
				else { httpStatus = 404; }
				break;
			// Alle anderen Anfragen werden an die Datei "pages.js" übergeben, die je
			// nach Pfad ein Programm ausführt und ein HTML-Dokument bereitstellt
			default:
				var page = require('./pages.js');
				var response = await page(method,path,query,cookies);
				httpStatus = response.status;
				httpContent = response.data;
		}

		var responseTime = new Date().getTime()-requestTime;

		// Dieser Teil des Programms vermerkt die Anfrage und die Antwortzeit im
		// Server-Log (geöffnete Konsole).
		var colorCodes = {gray: 30, red: 31, green: 32, yellow: 33, blue: 34, white: 37};
		var color = responseTime>200 ? '\x1b['+colorCodes.red+'m' : (responseTime>100 ? '\x1b['+colorCodes.yellow+'m' : '\x1b['+colorCodes.white+'m');
		console.log(color+'> '+method+' '+url[0]+' http/1.1'+' '+httpStatus+' in '+(responseTime/1000)+' s\x1b[0m');

		// deliver http-response
		// Dieser Teil des Programms sendet die Daten zum Browser.
		res.writeHead(httpStatus,httpHeaders);
		res.write(httpContent);
	  res.end();
	});

}).listen(port);
