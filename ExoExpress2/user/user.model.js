import { model, Schema } from 'mongoose';
import { isEmail } from '../middlewares/email.vlidator.js';

/**
 * Class Post
 * @typedef {object} User
 * @property {string} email.required - email of user
 * @property {string} password.required - password of user
 */
const schema = new Schema({
    email: {type: String, unique: true, trim: true, lowercase:true, validate: [isEmail, "Veuillez vérifier le format de votre adresse email"]},
    password: {type: String}
})



export const User = model('User', schema)