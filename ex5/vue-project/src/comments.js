const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


app.all('/comments', (req, res) => {
    try {
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