# Tauschrausch

## Vorbereitung des Servers (für Windows-Nutzer)

### Programme installieren

Installieren Sie die Software **Git** von der Seite https://git-scm.com/download/win. Starten Sie die Konsole (`cmd`) und klonen Sie dieses Repository mit dem folgenden Befehl: `git clone https://github.com/philipp-moeller/Tauschrausch.git`. Geben Sie ihre Zugangsdaten ein, wenn Sie dazu aufgefordert werden.

Installieren Sie **NodeJS** von der Seite https://nodejs.org/en/download/. Öffnen Sie die Konsole und navigieren Sie in das Verzeichnis des Projektes indem Sie die Befehle `cmd` und anschließend `cd Tauschrausch` eingeben. Installieren Sie notwendige Zusatzmodule mit dem Befehl `npm install`.

### Datenbank erstellen

Laden Sie sich die Programme **MySQL-Server** and **MySQL-Shell** von der Seite https://dev.mysql.com/downloads/installer/ herunter und installieren Sie sie. Während des Installationsvorgangs des MySQL-Servers wählen Sie *Reconfigure* und in dem folgenden Menü *Use Legacy Authentication Method*.

Öffnen Sie die **MySQL-Shell** und verbinden Sie sich mit dem Server über den Befehl `\connect root@localhost`. Um den Datenbankbenutzer und die Datenbank zu erzeugen, geben Sie folgende Befehle ein:

- `\sql CREATE DATABASE tauschrausch;`
- `\sql CREATE USER tschrsch IDENTIFIED WITH mysql_native_password BY 'eWDPQFwAgpLkykgn';`
- `\sql GRANT ALL PRIVILEGES ON tauschrausch.* TO tschrsch;`

Erschaffen Sie die nötigen Datenbankstrukturen Ihres Systems durch Eingabe der folgenden Befehle in der **MySQL-Shell**.

*Hier kommen Ihre Befehle zum Erstellen der Datenbank hin. (z. B.* `\sql CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY);`*)*

## Server starten

Starten Sie den Server, indem Sie die Konsole öffnen (`cmd`) und in das Verzeichnis des Projektes wechseln (`cd Tauschrausch`). Führen Sie dort den Befehl `node server.js` aus. Öffnen Sie nun in einem Browser die Seite https://localhost:9876. Tada!

## Aufbau Server
![Struktur des Servers](https://raw.githubusercontent.com/philipp-moeller/Tauschrausch/main/meta/diagram.png)
