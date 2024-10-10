const mysql = require('mysql2');
const con = require('../db/connection');

function getAllComments (datas) {
    con.query('SELECT * FROM comments', (err, res) => {
        if (err) {
            console.error('Error in getAllComments()', err);
            return datas(err, null);
        }
        datas(null, res);
    });
};

function getCommentById (id, datas) {
    con.query('SELECT * FROM comments WHERE id =' + mysql.escape(id), (err, res) => {
        if (err) {
            console.error('Error in getCommentByID()', err);
        }
        datas(null, res);
    });
};

function addComment (comment, datas) {
    con.query('INSERT INTO comments (id, name, email, body) VALUES (?, ?, ?, ?)', 
        [comment.id, comment.name, comment.email, comment.body], (err, res) => {
            if (err) {
                console.error('Error in addComment()', err);
            }
            datas(null, res);
        });
};

function checkIfTableIsEmpty (datas) {
    con.query('SELECT COUNT(*) AS count FROM comments', (err, res) => {
        if (err) {
            console.error('Error in checkIfTableIsEmpty()', err);
        }
        datas(res[0].count === 0);
    });
};

module.exports = {
    getAllComments,
    getCommentById,
    addComment,
    checkIfTableIsEmpty
};
