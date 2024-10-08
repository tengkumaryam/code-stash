const axios = require('axios');
const Comment = require('../models/comment');

const listComments = async(req, res, next) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        res.send(response.data);
    } catch (error) {
        console.error('Page not found!', error);
        next(error); 
    }
};

const listCommentId = async(req, res, next) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
        res.send(response.data);
    } catch (error) {
        console.error('Id not found', error);
        next(error);
    }
};

module.exports = {
    listComments,
    listCommentId,
};