// dbPool.js
const mysql = require('mysql2/promise');

class DatabasePool {
  constructor() {
    this.pool = mysql.createPool({
      host: '192.168.107.121',
      user: 'root',
      password: 'ZNvZO0Fyxq1JcaVqh2tRVpFm3uGgv2qW',
      database: 'exercice6',
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,  
      queueLimit: 0,
    });
  }

  async getConnection() {
    return this.pool.getConnection();
  }

  async query(sql, params) {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  async closePool() {
    await this.pool.end();
    console.log('Pool closed');
  }
}

const databasePoolInstance = new DatabasePool();

module.exports = databasePoolInstance;
