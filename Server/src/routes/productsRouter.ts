
import {Router} from 'express';

import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productsController';

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProductById);         
productsRouter.post('/', createProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;