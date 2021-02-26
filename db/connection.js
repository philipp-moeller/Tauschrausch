// http://localhost/phpmyadmin/ -> view db from xampp
const mysql = require('mysql');
const User = require('../db/user.js');

// define connection to database / lone scipt for this?
const db = mysql.createConnection({
    connectionLimit : 10,
    host: 'localhost', // ip-Adress of the server
    user: 'root',
    password: '',
    database: 'tauschrausch-database' // name of the database
  });
  db.connect( (err) => {
    if(err){
        console.log(err);
        console.log("Maybe check out, if the proper database exist");
    } else {
        console.log("MYSQL connected...");
    };
  });
  // does not work
  // pool.getConnection( req, res) {
  //   if(err){
  //     res.send("Error occured")
  //   }else {
  //     pool.query('SELECT * from name limit 10', function (err2, records, fields){
  //       if(!err2) {
  //         res.send(records)
  //       }
  //       conn.release(); // release used pool connection again
  //     })
  //   }
  // }
  

    // editTable();
    // var user = new User(1);  // erzeugt Nutzer mit `id=1`
    // await user.init();   // lädt die Daten aus Datenbank
    // console.log(user.name);  // gibt den Namen des Nutzers aus
    //user.name = "Martin";  // setzt eine Eigenschaft des Nutzers
    // await user.save();   // speichert den Nutzer in Datenbank
  

//   function get_info(data, promise){

//     var sql = "SELECT a from b where info = data";

//     connection.query(sql, function(err, results){
//           if (err){ 
//             throw err;
//           };
//           console.log(results[0].objid); // good
//           stuff_i_want = results[0].objid;  // Scope is larger than function
//           promise.resolve(results[0].objid);
//         });
//   };

//   function editTable (){
//     var sql = "INSERT INTO users (name) VALUES ('Joschua Q')";
//     db.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
//   };



module.exports = db;