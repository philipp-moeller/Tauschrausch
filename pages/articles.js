const Template = require('../template.js');
const User = require('../db/user.js');
const db = require('../config.js');
const dbTable = require('../db/dbTable.js');
const util = require('util'); // var tableData = util.inspect(user, {showHidden: false, depth: null});
const { table } = require('console');

module.exports = async function(path1) {

	// ! ReferenceError: path1 is not defined
	var articleContent = "";
	if (path1=="article01") {
		articleContent = "Faust Lektüre:";

	  	var html = new Template('./html/articleTemplate.html',{
			articleName: "Article01",
			articleContent: articleContent,
			description: "Faust buch/Heft Lektüre mit Notizen am Rand"
		});
		return await html.parse();

	} else if (path1=="article02") {
		articleContent = "blaue Handschuhe";

	  	var html = new Template('./html/articleTemplate.html',{
			articleName: "Article02",
			articleContent: articleContent,
			description: "Blaue Handschuhe der Größe 42"
		});
		return await html.parse();

	} else {
		// get user from db table
		let tableContent = await db.query("SELECT * FROM users");
		console.table(tableContent); // tableContent[index].id -> [index] from object table

		// look for user in table with this name
		dbTable("TestName 1");
		
		var html = new Template('./html/articles.html',{
			// pass through db-table/rows to html
			tableContent: table
		});
		return await html.parse();
	}
}
