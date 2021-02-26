const Template = require('./template.js');

module.exports = async function(method,path,query,cookies) {

	var html = '';
	var status = 200;

	// In diesem Programmteil werden die Pfade ausgelesen und mit Unterprogrammen
	// verknüpft. Die Unterprogramme liefern jeweils HTML-Quelltext zurück.
	var build;
	switch (path.shift()) {
		case '':
			if (path.length==0) {
				// GET "/"
				build = require('./pages/home.js')
				html = await build(/* Hier können Daten übergeben werden. */)
			}
			break;
		case 'login':
			if (path.length==0) {
				// GET "/login"
				build = require('./pages/login.js')
				html = await build()
			}
			break;
		case 'christian':
			if (path.length==0) {
				// GET "/christian"
				build = require('./pages/christian.js')
				html = await build()
			}
			break;
		case 'frechheit':
			if (path.length==0) {
				// GET "/frechheit"
				build = require('./pages/philip.js')
				html = await build()
			}
			break;
		case 'menu':
			if (path.length==0) {
				// GET "/menu"
				build = require('./pages/menu.js')
				html = await build(query.username, query.password) // watch menu.js!
			}
			break;
		case 'articles':
			if (path.length==0) {
				// GET "/articles"
				build = require('./pages/articles.js')
				html = await build() // pass through db-table/rows
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
