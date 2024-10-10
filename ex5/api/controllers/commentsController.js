const axios = require('axios');
const comment = require('../models/comment');

const listComments = async(req, res, next) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        res.send(response.data);
    } catch (error) {
        console.error('Page not found!', error);
        // console.error('Page not found!');
        next(error); 
    }
};

const listCommentId = async(req, res, next) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
        res.send(response.data);
    } catch (error) {
        // console.error('Id not found', error);
        console.error('Id not found');
        next(error);
    }
};

module.exports = {
    listComments,
    listCommentId,
};