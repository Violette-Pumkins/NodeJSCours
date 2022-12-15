import { User } from "./user.model.js"


const login = async(req, res) => {
    try {
        const { body : data } = req
        const user = await User.findOne({email : data.email, password : data.password})
        if(!user) {
            res.status(401).json( { message: "Impossible d'auth" })
        }
        res.status(200).json(user)
    } catch(err) {
        res.status(401).json( { message: err.message })
    }
}

const subscribe = async(req, res) => {
    try{
        const {body : data} = req
        const user = await User.create(data)
        res.status(201).json(user)
    } catch(err) {
        res.status(400).json( { message: err.message })
    }
}

export {
    login,
    subscribe
}