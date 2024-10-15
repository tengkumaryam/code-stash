const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.listComments);
router.get('/:id', commentsController.listCommentId);
router.put('/:id', commentsController.modifyComment);
router.delete('/:id', commentsController.deleteComment);
router.post('/', commentsController.listNewComment);

module.exports = router;