const axios = require('axios');
const express = require('express');

const app = express();

app.all('/comments', (req, res) => {
    try {
        // res.send('Hello World!');
        axios.get('https://jsonplaceholder.typicode.com/comments?')
            .then(response => response.data)
            .then((data) => res.send(data))
            .catch((error1) => {
                console.error('An error occured in the then/catch !', error1);
                throw error1;
            });
    }
    catch (error2) {
        console.log("An error occured in try/catch !", error2);
    }

})

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})