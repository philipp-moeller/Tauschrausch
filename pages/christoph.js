const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(alter) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	var x = "neunten " + "März " + "2003";
	var y = "Katzen";
	var z = "Hunde";
	alter = alter;
	var b = "im" + "Internet";

	var html = new Template('./html/christoph.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
		tag: x,
		ueberlegenestier: y,
		okayestier: z,
		alter: alter,
		ort: b
	});
	return await html.parse();
}
