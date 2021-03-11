const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(number) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();
	number = number*2;
	othernumber = number-18;

	var html = new Template('./html/maja.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
		pinguin: number,
		keinpinguin: othernumber
	});
	return await html.parse();
}