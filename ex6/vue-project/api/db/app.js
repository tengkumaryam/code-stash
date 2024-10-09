const express = require('express');
const axios = require('axios');
const commentRepository = require('./repositories/commentRepository');
const app = express();
const cors = require('cors');
const { checkIfTableIsEmpty } = require('./repositories/commentRepository');

app.use(cors());
app.use(express.json());

const port = 4000;

// async function fetchComments () {
//     const empty = await commentRepository.checkIfTableIsEmpty();
//     if (empty) {
//         console.log("Table is not empty");
//         const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
//         const comments = response.data;
//         for (const comment of comments) {
//                 commentRepository.addComment({
//                 id: comment.id,
//                 name: comment.name,
//                 email: comment.email,
//                 body: comment.body
//             });
//         }
//     } else {
//         console.log("Table is not empty");
//     }
// };

app.listen(port, () => {
    console.log(`Litening on port ${port}`);
    checkIfTableIsEmpty(async(empty) => {
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
                console.log(`${i} data recorded`);
                i++;
            }
        } else {
            console.log("Table is not empty");
        }
    })
});
