const router = require('express').Router();
const { User } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  User.findAll()
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving user.', details: err.message });
    });
});
router.get('/:id', withAuth, (req, res) => {
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
router.post('/', (req, res) => {
  User.create({ username: req.body.username, password: req.body.password, is_admin: req.body.admin })
  .then((user) => {
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(user)
    })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
});

// Login
// Login
router.post('/login', (req, res) => {
User.findOne({
  where: {
    username: req.body.username,
  },
})
.then((dbUserData) => {
  if (!dbUserData) {
    res
      .status(400)
      .json({ message: 'Incorrect username or password. Please try again!' });
    return;
  }

  const validPassword = dbUserData.checkPassword(req.body.password);

  if (!validPassword) {
    res
      .status(400)
      .json({ message: 'Incorrect username or password. Please try again!' });
    return;
  }

  req.session.save(() => {
    req.session.loggedIn = true;
    res
      .status(200)
      .json({ user: dbUserData, message: 'You are now logged in!' });
  });
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});


// Logout
router.post('/logout', (req, res) => {
if (req.session.loggedIn) {
  req.session.destroy(() => {
    res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// DELETE a user
router.delete('/:id', withAuth, (req, res) => {
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