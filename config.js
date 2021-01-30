const mysql = require('mysql');
const util = require('util');

// Diese Datei enthält die Zugangsdaten zu der Datenbank und stellt eine Methode
// bereit, mit der Datenbankanfragen ausgführt werden können.

var pool = mysql.createPool({
	connectionLimit : 10,
  host: 'localhost',
  user: 'tschrsch',
  password: 'eWDPQFwAgpLkykgn',
  database: 'tauschrausch'
});

exports.pool = pool;
exports.query = util.promisify(pool.query).bind(pool);
