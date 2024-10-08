const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


app.all('/comments', (req, res) => {
    try {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.data)
            .then((data) => res.send(data))
            .catch((error) => {
                console.error('An error occured in 1st then/catch !', error);
                throw error;
            });
    }
    catch (error) {
        console.log("An error occured in 1st try/catch !", error2);
    }

})

app.get('/comments/:id', (req, res) => {
    try {
        const id = req.params.id;
        axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
        .then(response => response.data)
            .then((data) => res.send(data))
            .catch((error) => {
                console.error('An error occured in 2nd then/catch !', error);
                
            });
    } catch (error) {
        console.error('An error occurred in 2nd try/catch', error);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
