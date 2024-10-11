const mysql = require('mysql2');
const con = require('../db/connection');

// Function form :O
// const totos= async () => {
//     return [];
// }

const getAllComments = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM comments', (err, res) => {
            if (err) {
                console.error('Error in getAllComments()', err);
                reject(err);
            }
            resolve(res);
        });
    })
};

const getCommentById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM comments WHERE id =' + mysql.escape(id), (err, res) => {
            if (err) {
                console.error('Error in getCommentByID()', err);
                reject(err);
            }
            resolve(res);
        });
    });
};

const addComment = (comment) => {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO comments (id, name, email, body) VALUES (?, ?, ?, ?)',
            [comment.id, comment.name, comment.email, comment.body], (err, res) => {
                if (err) {
                    console.error('Error in addComment()', err);
                    reject(err);
                }
                resolve(res);
            });
    })
};

const checkIfTableIsEmpty = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT COUNT(*) AS count FROM comments', (err, res) => {
            if (err) {
                console.error('Error in checkIfTableIsEmpty()', err);
                reject(err);
            }
            resolve(res[0].count === 0);
        });
    })
};

module.exports = {
    getAllComments,
    getCommentById,
    addComment,
    checkIfTableIsEmpty
};
