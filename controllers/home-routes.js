const { Post, User, Comment } = require('../models');
const router = require('express').Router();

//gets all post
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    if (postData) {
      const posts = postData.map(post => post.get({ plain: true }))
      res.render('homepage', { posts, loggedIn: req.session.loggedIn })
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})


router.get('/signup', (req, res) => {
  res.render('signup')
});

//gets one specific post on the homepage and everything with that post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    if (!postData) {
      res.status(400).json({ message: 'Unable to find post with this id' })
    } else {
      const post = postData.get({ plain: true })
      res.render('single-post', { post, loggedIn: req.session.loggedIn })
    }
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router
