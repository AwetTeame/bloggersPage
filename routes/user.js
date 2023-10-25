const { render } = require('ejs')
const express = require('express')
const User = require('./../models/user')
const Article = require('./../models/article')
const Joi = require('joi')
const bycrypt = require('bcrypt')
const router = express.Router()

router.get('/signup', (req, res) => {
  res.render('users/signUp')
})

router.post('/signup', async (req, res) => {

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }).required,
    password: Joi.string(),
    role: Joi.string().valid((role) => {
      return role === 'admin' || role === 'user';
    })
  });

  try {
    const validateResults = schema.validate(req.body);
    if (validateResults.err) {
      res.send(validateResults.error.details).status(400);
      return;
    }
  } catch (err) {
    res.send(alert('Wrong input or input not filled!')).status(500);
    return;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    role: req.body.role,
    password: await bycrypt.hash(req.body.password, 10)
  });
  console.log(console.error());
  await user.save();
  res.render('users/signUp');
});

router.get('/signin', (req, res) => {
  res.render('users/signIn')
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!email) {
    return res.status(400).send('User is not found!');
  }

  const isMatch = await bycrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send('Incorrect password!');
  }

  req.session.user = {
    id: user.id,
    role: user.role,
    name: user.name
  };

const articles = await Article.find()
  res.render('users/loggedUser', { articles: articles });
});

router.get('/loggedUser', async(req, res) =>{
  const articles = await Article.find()
  res.render('users/loggedUser', { articles: articles })
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error in destroying session:', err);
          return res.status(500).send('Error in logging out.');
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
  });
});


module.exports = router