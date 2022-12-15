import { Router } from 'express'
import { postRouter } from '../post/post.router.js'
import { userRouter } from '../user/user.router.js'

const router = Router()


router.use('/post', postRouter)
router.use('/user', userRouter)

export {
    router as apiRouter
}