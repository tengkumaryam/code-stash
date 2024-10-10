const express = require('express');
const axios = require('axios');
const app = express();

const cors = require('cors');
const con = require('./connection');
const commentRepository = require('./repositories/commentRepository');
const { checkIfTableIsEmpty } = require('./repositories/commentRepository');
const { getAllComments } = require('./repositories/commentRepository');
const { getCommentById } = require('./repositories/commentRepository');

app.use(cors());
app.use(express.json());

const port = 4000;

async function fetchComments() {
    checkIfTableIsEmpty(async (empty) => {
        if (empty) {
            console.log("Table is empty");
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=200');
            const comments = response.data;
            let i = 1;
            for (const comment of comments) {
                commentRepository.addComment({
                    id: comment.id,
                    name: comment.name,
                    email: comment.email,
                    body: comment.body
                });
                i++;
            }
            console.log(`${i} data recorded`);
        } else {
            console.log("Table is not empty");
        }
    })
}
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    fetchComments();
});

app.get('/', (_, res) => {
    getAllComments((err, comments) => {
        if (err) {
            return res.send('Error!');
        }
        res.send(comments);
    }); 
});

app.get('/comment', (_, res) => {
    const id = 13;
    getCommentById(id, (err, comment) => {
        if (err) {
            return res.send('Error!');
        } else {
            res.send(comment);
        }
    });
});
