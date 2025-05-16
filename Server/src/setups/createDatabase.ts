import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'viganium',
  password: 'viganiumPass'
});

connection.connect();

connection.query(`CREATE DATABASE IF NOT EXISTS viganiumTask`, (err) => {
  if (err) throw err;
  console.log('Database created or exists already.');
});

connection.changeUser({ database: 'viganiumTask' }, (err) => {
  if (err) throw err;

  const createCategories = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`;

  const createProducts = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2),
      category_id INT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )`;

  connection.query(createCategories, (err) => {
    if (err) throw err;
    console.log('Categories table created.');
  });

  connection.query(createProducts, (err) => {
    if (err) throw err;
    console.log('Products table created.');
    connection.end();
  });
});
