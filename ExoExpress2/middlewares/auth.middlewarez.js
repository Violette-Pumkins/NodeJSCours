import config from "../config.js"
import jwt from 'jsonwebtoken'
export const auth = (req, res, next) => {
    try{
        console.log(req.headers)
        const token = req.headers['authorization'].split(' ')[1]
        console.log(token)
        const decodedToken = jwt.verify(token, config.secret)
        console.log(decodedToken)
        if (decodedToken){
            console.log('auth')
            next()
        }else{
            res.status(409).json({ message: "Unauthorized"})
        }
    }catch(err){
        console.log('no auth')
        res.status(409).json({ message: err.message})
    }
}