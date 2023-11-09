const router = require('express').Router();
const { Event, Source } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {

    const dbEventData = await Event.findAll({
      include: [{
        model: Source,
        attributes: ['id'], as: 'source'
      }],
      logging: console.log,
    });

    const events = dbEventData.map((event) =>
      event.get({ plain: true })
    );
    res.render('homepage', { layout: 'main', loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', { layout: 'main' });
});
module.exports = router;
