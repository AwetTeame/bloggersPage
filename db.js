const db = require('mongoose');

db.connect('mongodb://localhost:27017/full_Stack_Bloggers');

module.exports = db;