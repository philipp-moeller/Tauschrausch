const Template = require('../template.js');
const User = require('../db/user.js');

module.exports = async function(username) {

	var html = new Template('./html/menu.html',{
		username: username
	});
	return await html.parse();
}
