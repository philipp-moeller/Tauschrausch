const Template = require('../template.js');
const User = require('../db/user.js');

module.exports = async function(query, username) {

	console.log("in menu.js:")
	console.log(username);
	console.log(query);

	// check if username is not empti, then create new User (useless, because util.js does not allow empty)
	if (username.length === 0){
		console.log("Username.length === 0");
	} else if (username.length > 0) {
		console.log("Username.length > 0");

		// create new User
		var user = new User();  // erzeugt Nutzer mit `id=0`

		await user.init();   // lädt die Daten aus Datenbank
	
		user.name = username;  // setzt eine Eigenschaft des Nutzers
		await user.save();   // speichert den Nutzer in Datenbank
	
		await user.init();   // lädt die Daten aus Datenbank

		console.log("new User created: " + user.name)
	}


	var html = new Template('./html/menu.html',{
		username: username
	});
	return await html.parse();
}
