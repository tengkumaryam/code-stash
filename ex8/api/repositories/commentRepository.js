const mysql = require('mysql2/promise');
const con = require('../db/connection');
const express = require('express');
const cors = require('cors');
const app = express();
 

app.post("/login", (req, res) => {

    const USERNAME = "uma victor";
    const PASSWORD = "8888";
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
      const user = {
        id: 1,
        name: "uma victor",
        username: "uma victor",
      };
      const token = jwt.sign(user, process.env.JWT_KEY);
      res.json({
        token,
        user,
      });
    } else {
      res.status(403);
      res.json({
        message: "wrong login information",
      });
    }
});


app.use(cors());
// const dbPool = require('./dbPool');

const getAllComments = async () => {
    try {
        const connection = await con;
        const [results] = await connection.execute('SELECT * FROM comments');
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
        const [results] = await connection.query('INSERT INTO comments (name, email, body, date_created) VALUES (?, ?, ?, ?)',
            [comment.name, comment.email, comment.body, comment.date_created]);
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
        const [results] = await connection.execute('UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ?', [name, email, body, id]);
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateComment()', error);
        throw error;
    }
};

const commentDeletion = async (id) => {
    try {
        const connection = await con;
        const [results] = await connection.execute('DELETE FROM comments WHERE id =' + mysql.escape(id));
        return results;
    } catch (error) {
        console.error('Error in commentDeletion()', error);
        throw error;
    }
};

const jsonToCsv = async (jsonData) => {
    if (!jsonData || jsonData.length === 0) return '';
    const header = Object.keys(jsonData[0]);
    const headerString = header.join(',');
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
    const rowItems = jsonData.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
    return csv;
};




const downloadResource = (res, fileName, fields, data) => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
  };
  {

  }

module.exports = {
    getAllComments,
    getCommentById,
    addComment,
    checkIfTableIsEmpty,
    updateComment,
    commentDeletion,
    jsonToCsv,
    downloadResource
};
