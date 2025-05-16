
import {Router} from 'express';

import {getCategories,getAllProductsByCategoryId, getCategoryById, createCategory, updateCategory, deleteCategory} from '../controllers/categoriesController';


const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id/products', getAllProductsByCategoryId);         
categoriesRouter.get('/:id', getCategoryById);         
categoriesRouter.post('/', createCategory);
categoriesRouter.put('/:id', updateCategory);
categoriesRouter.delete('/:id', deleteCategory);

export default categoriesRouter;