import db from './mysql';
import uniqid from 'uniqid';

module.exports = (app) => {
	app.get('/api/record', async (req, res) => {
		const id = req.body.id;
		const record = await db.query('SELECT * FROM records WHERE id = ? LIMIT 1', [id]);
		res.send(record);
	});

	app.put('/api/record', async (req, res) => {
		// Get day
		const id = uniqid.time();
		const patientId = req.body.patient_id;
		const doctorId = req.body.doctor_id;

		console.log(patientId);

		if (!patientId) {
			res.status(422).send('Missing record ID or patient ID');
			return;
		}

		const painTolerance = req.body.pain_tolerance || null;
		const symptoms = req.body.symptoms || null;
		const nausea = req.body.nausea || null;
		const diet = req.body.diet || null;
		const exercise = req.body.exercise || null;
		const bowelMovement = req.body.bowel_movement || null;
		const fatigue = req.body.fatigue || null;
		const tasteChange = req.body.taste_change || null;
		const medication = req.body.medication || null;

		try {
			await db.query(
				`
				INSERT INTO records (pain_tolerance, symptoms, nausea, diet, exercise, bowel_movement, fatigue, taste_change, medication, id, patient_id, doctor_id)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					painTolerance,
					symptoms,
					nausea,
					diet,
					exercise,
					bowelMovement,
					fatigue,
					tasteChange,
					medication,
					id,
					patientId,
					doctorId
				]
			);
			res.end();
		} catch (e) {
			console.log(e);
			res.status(422).send('Incorrect variable types passed');
		}
	});
	app.delete('/api/record/:id', async (req, res) => {
		// Delete it
	});
};
