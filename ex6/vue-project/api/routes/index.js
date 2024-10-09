const express = require('express');
const route = require('./comments');
const router = express.Router();

router.use('/', route);

module.exports = router;