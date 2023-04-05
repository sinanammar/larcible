const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const blogArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  readingDuration: {
    type: Number,
    required: true,
  },
  creator: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  thumbnailPhoto: {
    type: Buffer,
  },
  comments: [
    {
      user: {
        type: ObjectId,
        ref: 'User',
      },
      content: {
        type: String,
      },
      replies: [
        {
          user: {
            type: ObjectId,
            ref: 'User',
          },
          content: {
            type: String,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          likes: [
            {
              type: ObjectId,
              ref: 'User',
            },
          ],
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          type: ObjectId,
          ref: 'User',
        },
      ],
    },
  ],
})

const BlogArticle = mongoose.model('BlogArticle', blogArticleSchema)

module.exports = BlogArticle
