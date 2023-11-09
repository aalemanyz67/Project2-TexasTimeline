const router = require('express').Router();
const { Event, Source, User } = require('../../models');

const withAuth = require('../../utils/auth');

// /api/event
router.get('/', (req, res) => {
  Event.findAll({
    include: [{ model: Source, as: 'source' }]
  })
  .then(events => res.status(200).json(events))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving events.', details: err.message });
  });
});

router.get('/:id', (req, res) => {
  Event.findOne({
    where: { id: req.params.id },
    include: [{ model: Source, as: 'source' }]
  })
  .then(event => {
    if (!event) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }
    res.status(200).json(event);
  })
  .catch(err => { console.log(err)
    res.status(500).json({ error: 'An error occurred while retrieving the event.' })});
});

router.post('/', withAuth, (req, res) => {
  User.findOne({
      where: { username: req.body.username }
  })
  .then((user) => {
      if (!user) {
          res.status(404).json({ error: 'Event not found.' });
          return; 
      }
      return Event.create({
          title: req.body.title,
          date: req.body.date,
          end_date: req.body.end_date, 
          source_id: req.body.source_id,              
          author_id: user.id,
          content: req.body.content
      });
  })
  .then((newEvent) => {
      if (newEvent) {
          res.status(200).json(newEvent);
      }
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the event.', details: err.message });
  });
});
module.exports = router;
