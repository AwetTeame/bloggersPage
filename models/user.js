const { stringify } = require('querystring');
const db = require('../db');


const userSchema = new db.Schema({
        name: String,
        email: String,
        password: String,
        photo: Buffer,
        role: {
            type: 'string',
            enum: ['user', 'admin'],
            default: 'user'
        }
    });

const model = db.model('users', userSchema);

module.exports = model;