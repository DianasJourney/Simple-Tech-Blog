const { Comment } = require('../models')

const commentData = [
  {
    comment_text: 'Really love the sky today',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Do your best!',
    user_id: 2,
    post_id: 2
  }
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments

//adding in seed data to see what our comments post and users will look like