const router = require('express').Router();

const apiRoutes = require('../develop/routes/api');

router.use('/api', apiRoutes);

module.exports = router;