// dbPool.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '192.168.107.121',
  user: 'root',
  password: 'ZNvZO0Fyxq1JcaVqh2tRVpFm3uGgv2qW',
  database: 'exercice6',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


const checkPool = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('You are connected to the database!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

checkPool;

module.exports = pool;
