const { Schema } = require('mongoose')
const db = require ('../db')

const commentSchema = new Schema({
    comment: String,
    commentGiver: {
        userId: String,
        userName: String,
        userPhoto: Buffer
    }
})

module.exports = db.model('Comments', commentSchema)