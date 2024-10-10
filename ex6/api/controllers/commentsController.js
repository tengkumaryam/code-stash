const comment = require('../models/comment');
const { getAllComments, getCommentById, addComment } = require('../repositories/commentRepository');

const listComments = async (req, res, next) => {
    try {
        getAllComments((err, comments) => {
            if (err) {
                return res.send('Error!');
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
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            body: req.body.body,
        };

        addComment(newComment, (err, result) => {
            if (err) {
                res.send('Error!', err);
            }
            res.send('Comment added!');
        });
    } catch (error) {
        console.error('Can\'t add comment');
        next(error);
    }
};

module.exports = {
    listComments,
    listCommentId,
    listNewComment
};