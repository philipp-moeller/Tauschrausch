const Template = require('../template.js');
const dbTable = require('../db/dbTable.js');

// NOTWENDIG FÜR DATENBANKANBINDUNG!
const User = require('../db/user.js');

module.exports = async function(query, username) {

	console.log("in menu.js:")
	console.log(username);
	console.log(query);

	// check if username is not empti, then create new User (util.js does not allow empty field aswell)
	if (username.length === 0){
		console.log("Username.length === 0");
	} else if (username.length > 0) {
		console.log("Username.length > 0");

		if (dbTable(username) === true){
			console.log("User already exist");
		} else {
			console.log(dbTable(username));

			// NOTWENDIG FÜR DATENBANKZUGRIFF
			var user = new User(3);  // erzeugt Nutzer mit `id=0`
			await user.init();   // lädt die Daten aus Datenbank

			var name = user.firstname + " " + user.lastname
		}
	}


	var html = new Template('./html/menu.html',{
		username: name
	});
	return await html.parse();
}
