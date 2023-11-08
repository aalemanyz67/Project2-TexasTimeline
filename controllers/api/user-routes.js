const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  User.findAll()
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving user.', details: err.message });
    });
});
router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id }
  })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving user.', details: err.message });
    });
});
// CREATE a user
router.post('/', async (req, res) => {
  User.create({ username: req.body.username, password: req.body.password, is_admin: req.body.admin })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE a user
router.delete('/:id', (req, res) => {
  User.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(user => {
          if (!user) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          res.status(200).json(user);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'An error occurred while retrieving user.', details: err.message });
      });
});

module.exports = router;