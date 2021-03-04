// http://localhost/phpmyadmin/ -> view db from xampp
const User = require('../db/user.js');
const db = require('../config.js');



const existUser = (userName, userPassword) => {
    // get user from db table
	let tableContent = await db.query("SELECT * FROM users");
	console.table(tableContent[1].id); // [index] from object table

    // compare each data of tableContent objects
    tableContent.array.forEach(element => {
        if ((element.name.equals(userName))) {
            console.log("YEEEEE!!")
            break;
        }
    });
}

const otherMethod = () => {

}

modules.exports = {
    existUser,
    otherMethod
};

    // // editTable
    // var user = new User(id);  // erzeugt Nutzer mit `id=1`

    // user.init();   // lädt die Daten aus Datenbank
    // console.log(user.name);  // gibt den Namen des Nutzers aus

    // user.name = username;  // setzt eine Eigenschaft des Nutzers
    // user.save();   // speichert den Nutzer in Datenbank

    // user.init();   // lädt die Daten aus Datenbank
    // console.log(user.name);  // gibt den Namen des Nutzers aus
  
// module.exports = makeStandartUser;