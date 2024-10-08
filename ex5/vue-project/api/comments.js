const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.all('/comments', async (req, res, next) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        res.send(response.data);
    } catch (error) {
        console.error('Error occured in 1st part', error);
        next(error);
    }
});

app.get('/comments/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
        res.send(response.data);
    } catch (error) {
        console.error('Error occured in 2nd part', error);
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Error!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
