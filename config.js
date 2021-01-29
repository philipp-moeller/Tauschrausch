const mysql = require('mysql');
const util = require('util');

var localConfig = require('./data/local_config.js');

var pool = mysql.createPool({
	connectionLimit : 10,
  host: 'localhost',
  user: 'tschrsch',
  password: 'eWDPQFwAgpLkykgn',
  database: 'tauschrausch'
});

exports.pool = pool;
exports.query = util.promisify(pool.query).bind(pool);
