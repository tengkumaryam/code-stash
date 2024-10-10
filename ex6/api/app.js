const express = require('express');
const axios = require('axios');
const app = express();
const route = require('./routes/index');
const cors = require('cors');
const { checkIfTableIsEmpty, addComment } = require('./repositories/commentRepository');

app.use(cors());
app.use(express.json());
app.use('/', route);

const port = 4000;

async function fetchComments() {
    checkIfTableIsEmpty(async (empty) => {
        if (empty) {
            console.log("Table is empty");
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=200');
            const comments = response.data;
            let i = 1;
            for (const comment of comments) {
                await new Promise((resolve) => {
                    addComment({
                        id: comment.id,
                        name: comment.name,
                        email: comment.email,
                        body: comment.body
                    },
                        () => {
                            console.log(`${i} data recorded`);
                            resolve();
                        });
                });
                i++;
            }
        } else {
            console.log("Table is not empty");
        }
    });
}

app.use((err, req, res, next) => {
    if (err.status === 400) {
        return res.status(400).send('Bad Request');
    } else if (err.status === 404) {
        return res.status(404).send('Not Found');
    } else if (err.status === 410) {
        return res.status(410).send('Gone');
    } else if (err.status === 410) {
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    fetchComments();
});