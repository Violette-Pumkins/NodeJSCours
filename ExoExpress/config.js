import dotenv from "dotenv"

dotenv.config({ path: '.env'})

export default {
    port: process.env.PORT || '3000',
    db : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}