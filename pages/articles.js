const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
// const User = require('../db/user.js');

module.exports = async function(/* Hier können Daten eingelesen werden. */) {

	// read db-table and return it to articles.html -> table
	// Beispiel:
	// var user = new User(1);
	// await user.init();

	var html = new Template('./html/articles.html',{
        // pass through db-table/rows to html
	});
	return await html.parse();
}
