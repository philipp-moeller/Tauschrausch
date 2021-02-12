// define connection to database
const db = mysql.createConnection({
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