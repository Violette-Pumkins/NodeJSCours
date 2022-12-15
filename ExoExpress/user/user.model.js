import { model, Schema } from 'mongoose';

/**
 * Class User
 * @typedef { object } User
 * @property { string } email.required
 * @property { string } password.required
 */
const schema = new Schema({
    email: { 
        type: String,
        unique: true
    },
    password : {
        type: String
    }
}, { timestamps: true })

export const User = model('User', schema)