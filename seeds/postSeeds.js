const { Post } = require('../models');

const postData = [
  {
    title: 'Blue skies',
    content: 'Have you guys seen the sky recently? It is very blue!!!',
    user_id: 1
  },
  {
    title: 'First day of bootcamp!',
    content:
      'Starting a new journey today',
    user_id: 2
  }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
