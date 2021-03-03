const Template = require('../template.js');
const User = require('../db/user.js');
const util = require('util');
const db = require('../config.js');

module.exports = async function() {

	// // editTable
    // var user = new User();  // erzeugt Nutzer mit `id=1`

    // await user.init();   // lädt die Daten aus Datenbank

    // user.name = "Josch";  // setzt eine Eigenschaft des Nutzers
    // await user.save();   // speichert den Nutzer in Datenbank

    // await user.init();   // lädt die Daten aus Datenbank

	// console.log("Users-Table: ");
	// var tableData = util.inspect(user, {showHidden: false, depth: null});
	// console.log(tableData);

	var userID; // = user.id;
	var userName; // = user.name;

	let tableContent = [];

	// get user from db table
	let dbTable = db.query("SELECT * FROM users");
	dbTable.then(function(result) {
		// return every content alone
		for(var i=result.length -1; i > -1; i--){
			console.log(result[i]);
		}
	})

	console.log(tableContent);

	var html = new Template('./html/articles.html',{
        // pass through db-table/rows to html
		userID: userID,
		userName: userName,
		tableData: 0
	});
	return await html.parse();
}
