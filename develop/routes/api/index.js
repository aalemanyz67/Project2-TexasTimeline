const router = require('express').Router();
const eventRoutes = require('./event-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

router.use('/event', eventRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;