import connection from '../config/db';
import Product from '../models/productsModel';

const findAllProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    connection.execute('SELECT * FROM products', [], (err, results) => {
      if (err) return reject(err);
      resolve(results as Product[]);
    });
  });
};
const findAllProductsByCategoryId = (category_id:number): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'SELECT * FROM products where category_id = ?',
      [category_id],
      (err, results) => {
        if (err) reject(err);
        else resolve(results as Product[]);
      }
    );
  });
};

const selectProductById = (id: number): Promise<Product | null> => {
  return new Promise((resolve, reject) => {
    connection.execute('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      const rows = results as Product[];
      resolve(rows.length ? rows[0] : null);
    });
  });
};

const createProduct = (product: Product): Promise<Product> => {
  return new Promise((resolve, reject) => {
    if (!product.name || product.price === undefined || !product.category_id) {
      return reject(new Error('Missing required product fields'));
    }

    connection.execute(
      'INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)',
      [product.name, product.price, product.category_id],
      (err, results) => {
        if (err) return reject(err);
        const insertId = (results as any).insertId;
        resolve({ ...product, id: insertId });
      }
    );
  });
};

const updateProduct = (id: number, product: Partial<Product>): Promise<Product | null> => {
  return new Promise((resolve, reject) => {
    // Build SET clause and values dynamically
    const fields = [];
    const values = [];

    if (product.name !== undefined) {
      fields.push('name = ?');
      values.push(product.name);
    }

    if (product.price !== undefined) {
      fields.push('price = ?');
      values.push(product.price);
    }

    if (product.category_id !== undefined) {
      fields.push('category_id = ?');
      values.push(product.category_id);
    }

    if (fields.length === 0) {
      return reject(new Error('No fields provided to update.'));
    }

    values.push(id); 

    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;

    connection.execute(query, values, (err, results) => {
      if (err) return reject(err);
      if ((results as any).affectedRows === 0) return resolve(null);
      resolve({ ...product, id } as Product);
    });
  });
};


const removeProductById = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    connection.execute('DELETE FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve((results as any).affectedRows > 0);
    });
  });
};

export default {
  findAllProducts,
  selectProductById,
  createProduct,
  updateProduct,
  removeProductById,
  findAllProductsByCategoryId
};
