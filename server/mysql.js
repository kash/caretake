import mysql from 'mysql';

let database = null;
let databaseInitiated = false;

export default class Db {
	static async initDb() {
		if (!databaseInitiated) {
			// Running on prod or staging

			database = mysql.createPool({
				connectionLimit: 20,
				host: '127.0.0.1',
				user: 'root',
				password: 'root',
				database: 'caretake'
			});

			databaseInitiated = true;
		}
	}

	static get connection() {
		return database;
	}

	static query(sql, variables = []) {
		return new Promise((resolve, reject) => {
			if (!database) {
				reject('Could not establish connection to database');
				return;
			}
			database.query(sql, variables, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					if (!rows || !Array.isArray(rows) || !rows.length) {
						resolve(undefined);
						return;
					}
					// Return just the object of the result if one result is requested
					if (sql.toUpperCase().indexOf('LIMIT 1') > -1 && rows.length === 1) {
						resolve(rows[0]);
					} else {
						resolve(rows);
					}
				}
			});
		});
	}
}
