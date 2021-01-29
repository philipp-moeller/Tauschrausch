const Template = require('../template.js');

module.exports = async function(/* Hier können Daten eingelesen werden. */) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.

	var html = new Template('./html/login.html',{
		// Hier können Daten übergeben werden.
	});
	return await html.parse();
}
