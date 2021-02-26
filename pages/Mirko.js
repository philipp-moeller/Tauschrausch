const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(/* Hier können Daten eingelesen werden. */) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	var html = new Template('./html/Mirko.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
	});
	return await html.parse();
}
