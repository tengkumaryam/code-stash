const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.listComments);
router.get('/:id', commentsController.listCommentId);
router.put('/:id', commentsController.modifyComment);
router.post('/', commentsController.listNewComment);

module.exports = router;