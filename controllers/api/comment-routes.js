const router = require('express').Router();
const { Comment, User } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({
        include: [{ model: User, as: 'user' }]
    })
        .then(comments => res.status(200).json(comments))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving comment.', details: err.message });
        });
});
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: { id: req.params.id },
        include: [{ model: User, as: 'user' }]
    })
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.status(200).json(comment);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving comment.', details: err.message });
        });
});

// CREATE a comment
router.post('/', withAuth, (req, res) => {
    comment.findOne({
        where: { username: req.body.username }
    })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: 'User not found.' });
                return Promise.reject('User not found.');
            }
            return Comment.create({
                content: req.body.content,
                user_id: user.id,
                event_id: req.body.event_id
            });
        })
        .then((content) => {res.status(200).json(content);})
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the comment.', details: err.message });
        });
});
// DELETE a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.status(200).json(comment);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving comment.', details: err.message });
        });
});

module.exports = router;