const mysql = require('mysql2/promise');
const con = require('../db/connection');
// const dbPool = require('./dbPool');

const getAllComments = async () => {
    try {
        const connection = await con; // "con" is a promise, so needs to be resolved first
        const [results] = await connection.execute('SELECT * FROM comments'); // .query can't be used with "con", a promise. 
        return results;
    } catch (error) {
        console.error('Error in getAllComments()', error);
        throw error;
    }
};

// const getAllCommentsPool = async () => {
//     try {
//         return dbPool.query('SELECT * FROM comments'); 
//     } catch (error) {
//         console.error('Error in getAllComments()', error);
//         throw error;
//     }
// };

const getCommentById = async (id) => {
    try {
        const connection = await con;
        const [results] = await connection.query('SELECT * FROM comments WHERE id =' + mysql.escape(id));
        return results;
    } catch (error) {
        console.error('Error in getCommentById()', error);
        throw error;
    }
};

const addComment = async (comment) => {
    try {
        const connection = await con;
        const [results] = await connection.query('INSERT INTO comments (id, name, email, body) VALUES (?, ?, ?, ?)',
            [comment.id, comment.name, comment.email, comment.body]);
        return results;
    } catch (error) {
        console.error('Error in addComment()', error);
        throw error;
    }
};

const checkIfTableIsEmpty = async () => {
    try {
        const connection = await con;
        const [results] = await connection.query('SELECT COUNT(*) AS count FROM comments');
        return results[0].count === 0;
    } catch (error) {
        console.error('Error in checkIfTableIsEmpty()', error);
        throw error;
    }
};

const updateComment = async (id, updatedData) => {
    const { name, email, body } = updatedData;

    try {
        const connection = await con;
        const [result] = await connection.execute('UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ?', [name, email, body, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateComment()', error);
        throw error;
    }
};

// const { connect } = require('../routes');

// Function form :O
// const totos= async () => {
//     return [];
// }

// const getAllComments = () => {
//     return new Promise((resolve, reject) => {
//         con.query('SELECT * FROM comments', (err, res) => {
//             if (err) {
//                 console.error('Error in getAllComments()', err);
//                 reject(err);
//             }
//             resolve(res);
//         });
//     })
// };

// const getCommentById = (id) => {
//     return new Promise((resolve, reject) => {
//         con.query('SELECT * FROM comments WHERE id =' + mysql.escape(id), (err, res) => {
//             if (err) {
//                 console.error('Error in getCommentByID()', err);
//                 reject(err);
//             }
//             resolve(res);
//         });
//     });
// };

// const addComment = (comment) => {
//     return new Promise((resolve, reject) => {
//         con.query('INSERT INTO comments (id, name, email, body) VALUES (?, ?, ?, ?)',
//             [comment.id, comment.name, comment.email, comment.body], (err, res) => {
//                 if (err) {
//                     console.error('Error in addComment()', err);
//                     reject(err);
//                 }
//                 resolve(res);
//             });
//     })
// };

// const checkIfTableIsEmpty = () => {
//     return new Promise((resolve, reject) => {
//         con.query('SELECT COUNT(*) AS count FROM comments', (err, res) => {
//             if (err) {
//                 console.error('Error in checkIfTableIsEmpty()', err);
//                 reject(err);
//             }
//             resolve(res[0].count === 0);
//         });
//     })
// };

module.exports = {
    getAllComments,
    getCommentById,
    addComment,
    checkIfTableIsEmpty,
    updateComment
};
