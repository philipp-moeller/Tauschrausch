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

		// !! user.lastname does not work yet !!
		if (dbTable(username) === true){
			console.log("User already exist");
		} else {
			console.log(dbTable(username));

			var nameArr = username.split(/\s+/);
			console.log("firstname:" + nameArr[0]);

			// NOTWENDIG FÜR DATENBANKZUGRIFF
			var user = new User();  // erzeugt Nutzer
			await user.init(); 
			user.firstname = nameArr[0];

			if (nameArr[1] > 0) { 
				console.log("lastname:" + nameArr[1]);
				user.secondname = nameArr[1];
			}
			if (nameArr[2] > 0) {
				console.log("second lastname:" + nameArr[2]);
				user.secondname = nameArr[1] + nameArr[2];
			}
			if (nameArr[3] > 0) {
				console.log("third lastname:" + nameArr[3]);
				user.secondname = nameArr[1] + nameArr[2] + nameArr[3];
			}
			if (nameArr.length >= 4) {
				console.log("Err: Your name cannot be longer than 4 words");
			} 

			user.save();
			
		}
	}


	var html = new Template('./html/menu.html',{
		username: username
	});
	return await html.parse();
}
