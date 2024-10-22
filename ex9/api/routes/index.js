const express = require('express');
const routes = require('./comments');
const router = express.Router();

router.use('/', routes);

module.exports = router;