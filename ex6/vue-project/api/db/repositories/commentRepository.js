const mysql = require('mysql2');
const con = require('../connection');

function getAllComments (datas) {
    con.query('SELECT * FROM comments', datas);
};

function getCommentById (id, datas) {
    con.query('SELECT * FROM comments WHERE id = ?', [id], datas);
};

function addComment (comment, datas) {
    con.query('INSERT INTO comments VALUES (?, ?, ?, ?)', 
        [comment.id, comment.name, comment.email, comment.body], datas);
};

function checkIfTableIsEmpty (datas) {
    con.query('SELECT COUNT(*) AS count FROM comments', (_, results) => {
        datas(results[0].count === 0);
    });
};

module.exports = {
    getAllComments,
    getCommentById,
    addComment,
    checkIfTableIsEmpty
};
