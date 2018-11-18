import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import Db from './mysql';

const app = express();

require('events').EventEmitter.prototype._maxListeners = 100;

app.use('/public', express.static(`${__dirname}/../public`));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('jwt_scret', 'fourwordsalluppercase');

Db.initDb();

// Bring it other applications
require('./record')(app);
require('./search/patients')(app);
require('./report/report')(app);

const validPaths = ['/', '/patient'];

for (const p of validPaths) {
	app.get(p, (req, res) => {
		res.sendFile(path.join(__dirname, '../', 'index.html'));
	});
}

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../', 'not-found.html')));

app.listen(9999, () => {
	console.log('started server');
});
