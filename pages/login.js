const Template = require('../template.js');
const editTable = require('../db/editTable.js');
const User = require('../db/user.js');


// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function() {

	var html = new Template('./html/login.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
	});
	return await html.parse();
}
