const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(username, password) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	// add username to html
	console.log(username);
	console.log(password);

	var html = new Template('./html/menu.html',{
		username: username
	});
	return await html.parse();
}
