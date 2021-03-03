const Template = require('../template.js');
const User = require('../db/user.js');
const Table = require('../db/editTable.js');

module.exports = async function(username, password, query) {

	// editTable
    var user = new User(0);  // erzeugt Nutzer mit `id=0`

    await user.init(0);   // lädt die Daten aus Datenbank
    console.log("Username before save:" + user.name);  // gibt den Namen des Nutzers aus

    user.name = username;  // setzt eine Eigenschaft des Nutzers
    await user.save();   // speichert den Nutzer in Datenbank

    await user.init();   // lädt die Daten aus Datenbank
    console.log("Username after save:" + user.name);  // gibt den Namen des Nutzers aus

	// add username to html
	console.log("query data:")
	console.log(query);

	var html = new Template('./html/menu.html',{
		username: username
	});
	return await html.parse();
}
