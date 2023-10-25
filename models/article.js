const { text } = require('express');
const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const User = require('./user')
const { marked } = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const db = require ('../db')




const articleSchema = new db.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        require: true
    },
    author: {
        userId:String,
        userName:String,
        photo:Buffer
      },
});

articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }

    if (this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema);