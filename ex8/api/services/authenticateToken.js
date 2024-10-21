const fs = require('fs');
const jwt = require('jsonwebtoken');

const publicKey = fs.readFileSync('./keys/public_key.pem', 'utf8');

// middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    // if (req.path === '/login') {
    //     return next();
    // }
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1]; // extract token if header exists
    if (!token) return res.status(401).json({ message: 'Authentication failed!' });
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;

        next();
    });
};

module.exports = authenticateToken;