
// services/categoryService.ts
import connection from '../config/db';
import Category from '../models/categoriesModel';
import Product from '../models/productsModel';

const findAllCategories = (): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'SELECT * FROM categories',
      [],
      (err, results) => {
        if (err) reject(err);
        else resolve(results as Category[]);
      }
    );
  });
};


const selectCategoryById = (id: number): Promise<Category | null> => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'SELECT * FROM categories WHERE id = ?',
      [id],
      (err, results) => {
        if (err) reject(err);
        else {
          const categories = results as Category[];
          resolve(categories.length ? categories[0] : null);
        }
      }
    );
  });
};

const createCategory = (category: Category): Promise<Category> => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'INSERT INTO categories (name) VALUES (?)',
      [category.name],
      (err, results) => {
        if (err) reject(err);
        else resolve({ ...category, id: (results as any).insertId });
      }
    );
  });
};

const updateCategory = (id: number, category: Category): Promise<Category | null> => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'UPDATE categories SET name = ? WHERE id = ?',
      [category.name, id],
      (err, results) => {
        if (err) reject(err);
        else {
          // Check if update affected any row
          if ((results as any).affectedRows === 0) resolve(null);
          else resolve({ ...category, id });
        }
      }
    );
  });
};

const removeCategoryById = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'DELETE FROM categories WHERE id = ?',
      [id],
      (err, results) => {
        if (err) reject(err);
        else resolve((results as any).affectedRows > 0);
      }
    );
  });
};

export default {
  findAllCategories,
  selectCategoryById,
  createCategory,
  updateCategory,
  removeCategoryById,
};
