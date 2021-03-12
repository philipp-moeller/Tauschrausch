const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(coolness) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	coolness= coolness*2;
	
	var html = new Template('./html/Jan.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
		name: {name}
    alter: {alter},
		
	});
	return await html.parse();
}
