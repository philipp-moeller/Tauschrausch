const Template = require('./template.js');

module.exports = async function(method,path,query,cookies) {

	var html = '';
	var status = 200;

	// In diesem Programmteil werden die Pfade ausgelesen und mit Unterprogrammen
	// verknüpft. Die Unterprogramme liefern jeweils HTML-Quelltext zurück.
	switch (path.shift()) {
		case '':
			if (path.length==0) {
				// GET "/login"
				var build = require('./pages/home.js')
				html = await build(/* Hier können Daten übergeben werden. */)
			}
			break;
		case 'login':
			if (path.length==0) {
				// GET "/login"
				var build = require('./pages/login.js')
				html = await build(/* Hier können Daten übergeben werden. */)
			}
			break;
		default:
			html = 'Fehler 404'
			status = 404;
	}

	// Diese Zeilen laden den erzeugten Seiteninhalt in den Rahmen des HTML-
	// Dokuments unter "/html/document.html"
	var doc = new Template('./html/document.html',{content: html});
	return {status: status, data: await doc.parse()};
}
