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

    // editTable();
  });

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