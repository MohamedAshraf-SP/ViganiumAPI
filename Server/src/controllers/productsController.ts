import e, { Request, Response } from 'express';
import Product from '../models/productsModel';
import productService from '../services/productsService';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const product = await productService.selectProductById(id);
    product
      ? res.status(200).json(product)
      : res.status(404).json({ error: 'Product not found' });
  } catch {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, category_id } = req.body;
  if (!name || price === undefined || !category_id) {
    res.status(400).json({ error: 'Missing product data' });
    return;
  }

  try {
    const product = await productService.createProduct({ name, price, category_id });
    res.status(201).json(product);
  } catch (error)
   {
    const err = error as Error || 'Error creating product';
    res.status(500).json({ error: `Error creating product: ${err.message}` });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
  const updatedFields: Partial<Product> = req.body;


    const result = await productService.updateProduct(id, updatedFields);
    
    result
        ? res.status(200).json(result)
      : res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: `Error updating product${error}` });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await productService.removeProductById(id);
    deleted
      ? res.status(204).send()
      : res.status(404).json({ error: 'Product not found' });
  } catch {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
