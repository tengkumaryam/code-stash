const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.listComments);
router.get('/:id', commentsController.listCommentId);
router.post('/', commentsController.listNewComment);

module.exports = router;