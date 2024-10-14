const mysql = require('mysql2/promise');

const con = mysql.createConnection({
    host: '192.168.107.121',
    user: 'root',
    password: 'ZNvZO0Fyxq1JcaVqh2tRVpFm3uGgv2qW',
    database: 'exercice6',
    port: 3306
});

// con.connect(err => {
//     if (err) {
//         console.error('Error in database connection :(', err);
//         return;
//     }
//     console.log('You are connected to the database!');
// });

module.exports = con;