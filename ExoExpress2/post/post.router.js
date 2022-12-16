import { Router } from 'express'
import { auth } from '../middlewares/auth.middlewarez.js'
import { createPost, getPosts, getSinglePost, removePost, updatePost } from './post.controller.js'
import { Post } from './post.model.js'

const router = Router()

/**
 * GET /api/post/
 * @summary Get all Posts
 * @tags Post
 * @return { object } 200 - success response
 * @security BearerAuth
 */
router.get('/', auth, getPosts)

/**
 * POST /api/post
 * @summary Create post
 * @tags Post
 * @param { Post } request.body.required
 * @return { object } 201 - success response
 * @security BearerAuth
 */
router.post('/', auth, createPost)

/**
 * GET /api/post/{id}
 * @summary Get one Post
 * @tags Post
 * @param { string } id.path.required - id of Post
 * @return { object } 200 - success response
 * @security BearerAuth
 */
router.get('/:id', auth, getSinglePost)

/**
 * PUT /api/post/{id}
 * @summary Update one Post
 * @tags Post
 * @param { string } id.path.required - id of Post
 * @param { Post } request.body.required - Post
 * @return { object } 201 - success response
 * @security BearerAuth
 */
router.put('/:id', auth, updatePost)

/**
 * DELETE /api/post/{id}
 * @summary Remove one Post
 * @tags Post
 * @param { string } id.path.required - Post
 * @return { object } 204 - success response
 * @security BearerAuth
 */
router.delete('/:id', auth, removePost)

export {
    router as postRouter
}