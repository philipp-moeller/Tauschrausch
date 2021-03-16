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
				html = await build(query, query.username)
			}
			break;
		case 'menu':
			if (path.length==0) {
				// GET "/menu"
				build = require('./pages/menu.js')
				html = await build(query, query.username) // watch menu.js!
			}
			break;
		case 'articles':
			if (path.length==0) {
				// GET "/articles"
				build = require('./pages/articles.js')
				html = await build(100)
			}
			if (path.length==1) {
				// GET "/articles/{article01}|{article02}|{...}}"
				build = require('./pages/articles.js')
				html = await build(path[0])
			}
			if (path.length==2) {
				// GET "/articles/{?}"
				build = require('./pages/articles.js')
				html = await build(0)
			}
			break;
		case 'christian':
			if (path.length==0) {
				// GET "/christian"
				build = require('./pages/christian.js')
				html = await build(100)
			}
			if (path.length==1) {
				// GET "/christian/{{irgendeineZahl}|{mathe}|{physik}}"
				build = require('./pages/christian.js')
				html = await build(path[0])
			}
			if (path.length>1) {
				// GET "/christian/zu/viele/parameter"
				build = require('./pages/christian.js')
				html = await build(0)
			}
			break;
		case 'frechheit':
			if (path.length==2) {
				// GET "/frechheit/{irgendwas}"
				build = require('./pages/philip.js')
				html = await build(path[0],path[1])
			}
			break;
		case 'christoph':
			if (path.length==0) {
				// GET "/christoph"
				build = require('./pages/christoph.js')
				html = await build(100)
			}
			if (path.length==1) {
				// GET "/christoph/{irgendwas}"
				build = require('./pages/christoph.js')
				html = await build(path[0])
			}
			break;
		case 'jan':
			if (path.length==0) {
				// GET "/jan"
				build = require('./pages/Jan.js')
				html = await build(100)
			}
			if (path.length==1) {
				// GET "/jan/{coolnessfaktor}"
				build = require('./pages/Jan.js')
				html = await build(path[0])
			}
			if (path.length==2) {
				// GET "/jan2/{name}/{alter2}"
				build = require('./pages/Jan.js')
				html = await build(0)
			}
			if (path.length>2) {
				// GET "/jan"
				build = require('./pages/Jan.js')
				html = await build(0)
			}
			break;
		case 'kristin':
			if (path.length==1) {
				build = require('./pages/kristin.js')
				html = await build(path[0])
			}
			if (path.length==0) {
				// GET "/kristin"
				build = require('./pages/kristin.js')
				html = await build(20)
			}
			break;
		case 'maja':
			if (path.length==1) {
				// GET "/maja/{pinguine}"
				build = require('./pages/maja.js')
				html = await build(path[0])
			}
			if (path.length==0) {
				// GET "/maja"
				build = require('./pages/maja.js')
				html = await build(18)
			}
			break;
		case 'user':
			if (path.length==1) {
				// GET "/user/{id}"
				build = require('./pages/user.js')
				html = await build(path[0])
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
