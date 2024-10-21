const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authenticateToken = require('../services/authenticateToken')

const basePath = "/comments"

router.get(`${basePath}/`, commentsController.listComments);
router.get(`${basePath}/:id`, commentsController.listCommentId);
router.post(`${basePath}/`, commentsController.listNewComment);
router.put(`${basePath}/:id`, authenticateToken, commentsController.modifyComment);
router.delete(`${basePath}/:id`, commentsController.deleteComment);
router.get(`${basePath}/download/csv`, commentsController.downloadComment);
// router.post(`login`, commentsController.modifyComment);

module.exports = router;