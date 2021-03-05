const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(pkt) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	pkt = pkt*2;

	var html = new Template('./html/philip.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
		punkte: pkt
	});
	return await html.parse();
}
