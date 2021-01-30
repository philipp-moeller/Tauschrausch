const dbObject = require('../object.js');

// Diese Datei stellt eine Klasse zur Verfügung, die Daten aus einer Datenbank-
// tabelle lädt und als Javascript-Objekt bereitstellt.
//
// Beispiel:
//
// `+-------------+-------------+`
// `| id          | name        |`
// `+-------------+-------------+`
// `| 1           | Max         |`
// `| 2           | Martina     |`
// `+-------------+-------------+`
//
// `const User = require('../db/user.js');`	// lädt diese Datei in eine Seite
// `var user = new User(1);`								// erzeugt Nutzer mit `id=1`
// `await user.init();`											// lädt die Daten aus Datenbank
// `console.log(user.name);`								// gibt den Namen des Nutzers aus
// `user.name = "Martin";`									// setzt eine Eigenschaft des Nutzers
// `await user.save();`											// speichert den Nutzer in Datenbank
// `await user.delete();`										// löscht den Nutzer aus Datenbank
//
// Ein neuer Nutzer wird mit `new User();` angelegt.

module.exports = class extends dbObject {

	constructor(id) {
		super('users',id);	// Diese Zeile enthält den Tabellennamen dieses Datentyps.
	}

	composeFrom(origin) {
		super.composeFrom(origin);
		// Hier können Transformationen beim Lesen aus der Datenbank erstellt werden.
	}

	decompose() {
		var toObject = super.decompose();
		// Hier können Transformationen beim Schreiben in die Datenbank erstellt werden.
		return toObject;
	}

	// Hier können weitere Methoden der Klasse hinzugefügt werden.

	toString() {
		return this.id;
	}
}
