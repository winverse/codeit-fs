import express from 'express';
import { usersRouter } from './users.js';
import { postsRouter } from './posts.js';

export const router = express.Router();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
