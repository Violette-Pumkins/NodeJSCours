import { Router } from 'express'
import { createPost, getPosts, getSinglePost } from './post.controller.js'

const router = Router()


router.get('/', getPosts)
router.get('/:id', getSinglePost)

/**
 * POST /api/post
 * @summary Create post
 * @tags Post
 * @param { Post } request.body.required
 * @return { object } 201 - success response
 */
router.post('/', createPost)

router.put('/:id', (req, res) => {
    const { id } = req.params
    res.send('route pour maj le post ' + id)
})

router.delete('/:id', (req,res) => {
    const { id } = req.params
    res.send('route pour delete le post ' + id)
})

export {
    router as postRouter
}