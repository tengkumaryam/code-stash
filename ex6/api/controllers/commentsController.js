const axios = require('axios');
const comment = require('../models/comment');
const { getAllComments, getCommentById, addComment } = require('../repositories/commentRepository');

const listComments = async (req, res, next) => {
    try {
        getAllComments((err, comments) => {
            if (err) {
                return res.status(500).send('Error!');
            }
            res.send(comments);
        });
    } catch (error) {
        console.error('Page not found!', error);
        next(error);
    }
};

const listCommentId = async (req, res, next) => {
    const id = req.params.id;
    try {
        getCommentById(id, (err, comment) => {
            if (err) {
                return res.send('Error!');
            }
            res.send(comment);

        });
    } catch (error) {
        console.error('Id not found');
        next(error);
    }
};

const listNewComment = async (req, res, next) => {
    try {
        const newComment = {
            name: req.body.name,
            email: req.body.email,
            body: req.body.body,
        };

        addComment(newComment, (err, result) => {
            if (err) {
                res.send('Can\'t add comment due to error below : ', err);
            }
            res.send('Comment added!');
        });
    } catch (error) {
        console.error('Can\'t add comment due to error below : ', error);
        next(error);
    }
};

module.exports = {
    listComments,
    listCommentId,
    listNewComment
};