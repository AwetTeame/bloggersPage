const express = require ('express');
const Article = require('./models/article')
const methodOverride = require('method-override');
const bodyParser = require ('body-parser')
const session = require('express-session')
const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.use(session({
  secret: 'my_secret',
  resave: false,
  saveUninitialized: true
}))

const userRouter = require ('./routes/user')
const articlesRouter = require ('./routes/articles')
const commentRouter = require ('./routes/comments')

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })  
  res.render('index', { articles: articles });
})

app.use('/user', userRouter)
app.use('/articles', articlesRouter)
app.use('/comment', commentRouter)

const port = 5000;

app.listen(port, ()=> console.log(`http://lvh.me:${port}`));