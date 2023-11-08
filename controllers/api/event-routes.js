const router = require('express').Router();
const { Event, Source } = require('../../models');

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

module.exports = router;