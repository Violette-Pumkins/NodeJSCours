import { Router } from 'express'
import { postRouter } from '../post/post.router.js'

const router = Router()

router.use('/post', postRouter)

export {
    router as apiRouter
}