const Template = require('../template.js');
const User = require('../db/user.js');

// add a popup window, when creating a new acc. (action by click button)
module.exports = async function(query) {

	// create new User
    var user = new User();  // erzeugt Nutzer mit `id=0`

    await user.init();   // lädt die Daten aus Datenbank
    console.log("Username before save:" + user.name);  // gibt den Namen des Nutzers aus

    user.name = "username";  // setzt eine Eigenschaft des Nutzers
    await user.save();   // speichert den Nutzer in Datenbank

    await user.init();   // lädt die Daten aus Datenbank
    console.log("Username after save:" + user.name);  // gibt den Namen des Nutzers aus

	console.log("query data:")
	console.log(query);

	// templating in html
	var html = new Template('./html/login.html',{
		
	});
	return await html.parse();
}
