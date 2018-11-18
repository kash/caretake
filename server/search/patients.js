import db from '../mysql';
module.exports = (app) => {
	app.get('/api/search/patients', async (req, res) => {
		const query = req.query.name;
		// TODO ideally we want to get this from the JWT, but so it go
		const doctorId = '12345';

		const rows = await db.query(
			`SELECT id, first_name, last_name FROM patients WHERE doctor_id = ? AND first_name LIKE ? OR last_name LIKE ?`,
			[doctorId, query + '%', query + '%']
		);

		res.json(rows || []);
	});
};
