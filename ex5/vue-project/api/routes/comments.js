const express = require('express');
const router = express.Router();
const { listComments, listCommentId } = require('../controllers/commentsController');

router.get('/', listComments);
router.get('/:id', listCommentId);

module.exports = router;