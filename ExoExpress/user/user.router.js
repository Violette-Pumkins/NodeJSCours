import { Router } from 'express'
import { login, subscribe } from './user.controller.js'


const router = Router()

/**
 * POST /api/user/login
 * @summary Log a user
 * @tags User
 * @param { string } email.required Email 
 * @param { string } password.required Password 
 * @return { object } 200 - success response
 */
router.post('/login', login)

/**
 * POST /api/user/subscribe
 * @summary Create a user
 * @tags User
 * @param { string } email.required Email 
 * @param { string } password.required Password 
 * @return { object } 201 - success response
 */
router.post('/subscribe', subscribe)


export {
    router as userRouter
}