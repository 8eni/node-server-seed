module.exports = function(app, db) {

	var ObjectID = require('mongodb').ObjectID;

	app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
		db.collection('notes').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'an error has occured' });
			} else {
				res.send(item);
			}
		})
	});

  app.post('/notes', (req, res) => {
		const note = {
			text: req.body.body,
			title: req.body.title
		};
		db.collection('notes').insert(note, (err, result) => {
			if (err) {
				res.send({ 'error': 'an error has occured' });
			} else {
				res.send(result.ops[0]);
			}
		})
  });

  app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const note = { '_id': new ObjectID(id) };
		db.collection('notes').remove(note, (err, result) => {
			if (err) {
				res.send({ 'error': 'an error has occured' });
			} else {
				res.send('Note '+ id +' deleted');
			}
		})
  });
};