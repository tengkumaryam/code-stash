const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authenticateToken = require('../services/authenticateToken')

const basePath = "/comments"

router.get(`${basePath}/`, authenticateToken, commentsController.listComments);
router.get(`${basePath}/:id`, authenticateToken, commentsController.listCommentId);
router.post(`${basePath}/`, authenticateToken, commentsController.listNewComment);
router.put(`${basePath}/:id`, authenticateToken, commentsController.modifyComment);
router.delete(`${basePath}/:id`, authenticateToken, commentsController.deleteComment);
router.get(`${basePath}/download/csv`, authenticateToken, commentsController.downloadComment);
router.post(`login`, commentsController.modifyComment);

module.exports = router;