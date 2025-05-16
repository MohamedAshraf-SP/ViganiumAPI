import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'viganium',
  password: 'viganiumPass',
  database: 'viganiumTask',
  waitForConnections: true,
  connectionLimit: 10,
  // queueLimit: 0,
  // multipleStatements: true,
  // namedPlaceholders: true,
  // dateStrings: true,
  // supportBigNumbers: true,
  // bigNumberStrings: true,
  // debug: false,
  // charset: 'utf8mb4',
  // timezone: 'Z',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  // acquireTimeout: 10000,
  // connectTimeout: 10000,
  // waitForConnections: true,

});

export default connection;
