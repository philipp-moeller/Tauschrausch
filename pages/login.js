const Template = require('../template.js');
const User = require('../db/user.js');

// add a popup window, when creating a new acc. (action by click button)
module.exports = async function() {

	var html = new Template('./html/login.html',{
		// Hier können Daten an das HTML-Dokument übergeben werden.
	});
	return await html.parse();
}
