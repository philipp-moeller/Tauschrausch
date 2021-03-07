const Template = require('../template.js');
const User = require('../db/user.js');
const db = require('../config.js');
const dbTable = require('../db/dbTable.js');
const util = require('util');
const { table } = require('console');

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


	// get user from db table
	let tableContent = await db.query("SELECT * FROM users");
	console.table(tableContent); // tableContent[index].id -> [index] from object table
	// .map anschauen

	// look for user in table with this name
	dbTable("TestName 1");
	
	var html = new Template('./html/articles.html',{
        // pass through db-table/rows to html
		userID: userID,
		userName: userName,
		tableContent: table
	});
	return await html.parse();
}
