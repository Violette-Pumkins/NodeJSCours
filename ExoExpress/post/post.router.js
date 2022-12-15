import { Router } from 'express'
import { createPost, getPosts, getSinglePost, removePost, updatePost } from './post.controller.js'

const router = Router()

/**
 * GET /api/post
 * @summary Get all posts
 * @tags Post
 * @return { object } 200 - success response
 */
router.get('/', getPosts)

/**
 * GET /api/post/{id}
 * @summary Get a single post
 * @tags Post
 * @param { string } id.path.required - Post id
 * @return { Post } 200
 */
router.get('/:id', getSinglePost)

/**
 * POST /api/post
 * @summary Create post
 * @tags Post
 * @param { Post } request.body.required
 * @return { object } 201 - success response
 */
router.post('/', createPost)

/**
 * PUT /api/post/{id}
 * @summary Update one Post
 * @tags Post
 * @param { string } id.path.required - Post id
 * @param { Post } request.body.required - Post
 * @return { object } 201 - success response
 */
router.put('/:id', updatePost)

/**
 * DELETE /api/post/{id}
 * @summary Delete One Post
 * @tags Post
 * @param { string } id.path.required - Post id
 * @return { object } 204 - success response
 */
router.delete('/:id', removePost)

export {
    router as postRouter
}