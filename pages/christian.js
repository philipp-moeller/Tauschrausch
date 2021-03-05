const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(iqpath) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	var iqwert = Math.floor(Math.random() * (90 - 50 + 1) + 50);
	var iqresultcombine = String(iqpath) + String(iqwert);
	var iqresultadd = Number(iqwert) + Number(iqpath);

	var html = new Template('./html/christian.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
		iq1: iqwert,
		iq2: iqpath,
		iqresultcomb: iqresultcombine,
		iqresult: iqresultadd
	});
	return await html.parse();
}
