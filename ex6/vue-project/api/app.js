const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use('/comments', route);

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(400).send('Bad Request');
//     res.status(404).send('Not found');
//     res.status(410).send('Gone');
//     res.status(500).send('Internal Server Error'); //general
// });

app.use((err, req, res, next) => {
    // console.error(err);
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


const port = 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});