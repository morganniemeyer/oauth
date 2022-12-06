const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Post = require('../models/post.js');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.insert({
        post: req.body.post,
        user_id: req.user.id,
      });
      res.json(post);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  });
