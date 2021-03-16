const Template = require('../template.js');
const User = require('../db/user.js');

// add a popup window, when creating a new acc. (action by click button)
module.exports = async function(query, username) {

    console.log("in login.js:")
	console.log(username);
	console.log(query);

	// templating in html
	var html = new Template('./html/login.html',{
		
	});
	return await html.parse();
}
