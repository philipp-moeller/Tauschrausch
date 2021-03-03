// http://localhost/phpmyadmin/ -> view db from xampp
const mysql = require('mysql');
const User = require('../db/user.js');

module.export = async function (id, username){
    // editTable
    var user = new User(id);  // erzeugt Nutzer mit `id=1`

    user.init();   // lädt die Daten aus Datenbank
    console.log(user.name);  // gibt den Namen des Nutzers aus

    user.name = username;  // setzt eine Eigenschaft des Nutzers
    user.save();   // speichert den Nutzer in Datenbank

    user.init();   // lädt die Daten aus Datenbank
    console.log(user.name);  // gibt den Namen des Nutzers aus
}
  
// module.exports = makeStandartUser;