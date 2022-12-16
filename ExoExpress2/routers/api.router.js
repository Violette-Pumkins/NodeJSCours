import { Router } from 'express';
import { postRouter } from '../post/post.router.js';
import { authRouter } from '../user/user.router.js';

const router = Router();

router.use('/post', postRouter);
router.use('/auth', authRouter);

export {
    router as routerApi
};