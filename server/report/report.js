import db from '../mysql';

module.exports = (app) => {
	app.get('/api/report', async (req, res) => {
		const id = req.query.patientId;
		// TODO make sure that assigned doctor is the one that is in the JWT

		const rows = await db.query('SELECT * FROM records WHERE patient_id = ? ORDER BY created_at DESC', [id]);
		res.json(rows);
	});
};
