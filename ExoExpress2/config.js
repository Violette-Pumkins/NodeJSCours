import dotenv from "dotenv"

dotenv.config({ path: '.env' })

export default {
    port : process.env.PORT || '3000',
    secret : process.env.SECRET,
    db : {
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        database : process.env.DB_DATABASE
    }
}