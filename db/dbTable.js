// http://localhost/phpmyadmin/ -> view db from xampp
const User = require('../db/user.js');
const db = require('../config.js');

module.exports = async function(userName) {
    // get user from db table
	let tableContent = await db.query("SELECT * FROM users");
	// console.table(tableContent[1].id); // [index] from object table
    // console.table(tableContent.array); // -> undefined

    // compare each data of tableContent objects
    tableContent.map(element => {
        if (element.name == userName) {
            console.log("YEEEEE!!");
            // break;
        } else {
            console.log(element);
        }
    });
}

// "ReferenceError: modules is not defined"
// exports = {
//     existUser
//     // otherMethod
// };

    // // editTable
    // var user = new User(id);  // erzeugt Nutzer mit `id=1`

    // user.init();   // lädt die Daten aus Datenbank
    // console.log(user.name);  // gibt den Namen des Nutzers aus

    // user.name = username;  // setzt eine Eigenschaft des Nutzers
    // user.save();   // speichert den Nutzer in Datenbank

    // user.init();   // lädt die Daten aus Datenbank
    // console.log(user.name);  // gibt den Namen des Nutzers aus
  
// module.exports = makeStandartUser;