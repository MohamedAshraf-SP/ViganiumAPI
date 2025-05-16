// controllers/categoryController.ts
import { Request, Response } from 'express';
import categoryService from '../services/categoriesService';
import productService from '../services/productsService';
import Category from '../models/categoriesModel';

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const category = await categoryService.selectCategoryById(id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category' });
  }
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
  const newCategory: Category = req.body;
  try {
    const result = await categoryService.createCategory(newCategory);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const updatedCategory: Category = req.body;
  try {
    const result = await categoryService.updateCategory(id, updatedCategory);
    if (!result) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await categoryService.removeCategoryById(id);
    if (!deleted) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};

const getAllProductsByCategoryId = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
    try {
        const products = await productService.findAllProductsByCategoryId(id);
        if (!products) {
        res.status(404).json({ error: 'No products found for this category' });
        } else {
        res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products for this category' });
    }
}

export {
  getCategories,
  getAllProductsByCategoryId,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
