import {Router} from 'express';
import productsRouter from './productsRouter';
import categoriesRouter from './categorisRouter';

const router = Router();

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

export default router;
