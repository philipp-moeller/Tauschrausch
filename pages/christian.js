const Template = require('../template.js');

// Hier können Module geladen werden.
//
// Beispiel:
const User = require('../db/user.js');

module.exports = async function(path1) {

	// Hier können Daten aus der Datenbank gelesen und / oder verarbeitet werden.
	//
	// Beispiel:
	// var user = new User(1);
	// await user.init();

  if (path1=="mathe") {
  	var html = new Template('./html/christian_formelsammlung_mathe.html',{
  		// Hier können Daten an das HTML-Dokument übergeben werden.
  	});
  	return await html.parse();
  } else if (path1=="physik") {
    var html = new Template('./html/christian_formelsammlung_physik.html',{
  		// Hier können Daten an das HTML-Dokument übergeben werden.
  	});
  	return await html.parse();
  } else {
    var iqwert = Math.floor(Math.random() * (90 - 50 + 1) + 50);
    var iqresultcombine = String(iqwert) + String(path1);
    var iqresultadd = Number(iqwert) + Number(path1);
    
    var user = new User(id);
    await user.init();

    var html = new Template('./html/christian.html',{
  		// Hier können Daten an das HTML-Dokument übergeben werden.
  		iq1: iqwert,
  		iq2: path1,
  		iqresultcomb: iqresultcombine,
  		iqresult: iqresultadd,
	    	username: user.name
  	});
  	return await html.parse();
  }
}
