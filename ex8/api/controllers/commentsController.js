const comment = require('../models/comment');
const con = require('../db/connection')
const { getAllComments, getCommentById, addComment, updateComment, commentDeletion} = require('../repositories/commentRepository');

const listComments = async (req, res, next) => {
    try {
        const comments = await getAllComments();
        res.send(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Error!');
        next(error);
    }
};

const listCommentId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const comment = await getCommentById(id);
        res.send(comment);
    } catch (error) {
        console.error('Error fetching comment with that ID');
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
        await addComment(newComment);
        res.send('Comment added!');
    } catch (error) {
        console.error('Error adding comment');
        next(error);
    }
};

const modifyComment = async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedComment = await updateComment(id, updatedData);
        if (updatedComment) res.send('Comment updated!');
    } catch (error) {
        console.error('Error modifying comment:', error);
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    const id = req.params.id;
    try {
        const comments = await commentDeletion(id);
        if (comments.affectedRows > 0) {
            const connection = await con;
            await connection.execute('UPDATE comments SET id = id - 1 WHERE id > ?', [id]);
            res.send('Comment deleted and IDs renumbered successfully!');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        next(error);
    }
}

module.exports = {
    listComments,
    listCommentId,
    listNewComment,
    modifyComment,
    deleteComment
};