const Template = require('../template.js');
const User = require('../db/user.js');
const util = require('util');
const db = require('../config.js');


// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function() {

	// editTable
    var user = new User();  // erzeugt Nutzer mit `id=1`

    await user.init();   // lädt die Daten aus Datenbank

    user.name = "Josch";  // setzt eine Eigenschaft des Nutzers
    await user.save();   // speichert den Nutzer in Datenbank

    await user.init();   // lädt die Daten aus Datenbank

	// does not work yet
	for (var i = userID; i > 0; i--){
		await user.init(i);
		console.log("User:");
		console.log(user.id);
	}

	console.log("Users-Table: ");
	var tableData = util.inspect(user, {showHidden: false, depth: null});
	console.log(tableData);

	var userID = user.id;
	var userName = user.name;

	// get user from db table
	let dbTable = db.query("SELECT * FROM users");
	dbTable.then(function(result) {
		console.log(result);	// return whole array
		// return every content alone
		for(var i=result.length -1; i > -1; i--){
			console.log(result[i]);
		}
	})

	var html = new Template('./html/articles.html',{
        // pass through db-table/rows to html
		userID: userID,
		userName: userName,
		tableData: user
	});
	return await html.parse();
}
