const Template = require('../template.js');

// Hier k�nnen Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function (number) {

	// Hier k�nnen Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	number = number*3;
	antinumber = 60-number;
	realnumber = number*5

	var html = new Template('./html/Kristin.html', {
		// Hier k�nnen Daten an das HTML-Dokument �bergeben werden.
		zeit: number,
		restzeit: antinumber,
		wirklichkeit: realnumber,
		jahre: 36,
		jahrzehnt: 1960,
		disziplin: oktopus-wrestling
		aktivität: musikhören
	
	});
	return await html.parse();
}
