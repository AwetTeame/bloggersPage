const express = require('express')
const router = express.Router()
const Article = require('./../models/article');
const Comment = require('../models/comment')

router.get('/new', (req, res) => {
    res.render('comments/new')
})

router.post('/:slug', async (req, res) => {
    const comment = new Comment({
        comment: req.body.newComment
    })
    await comment.save()
    const article = await Article.findOne({ slug: req.params.slug })
    const comments = await Comment.find()
    res.redirect(`/articles/${article.slug}`,)
})

module.exports = router