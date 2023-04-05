const mongoose = require('mongoose')

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  thumbnailPhoto: {
    type: Buffer,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
      },
      content: {
        type: String,
        required: true,
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          content: {
            type: String,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

const BlogArticle = mongoose.model('BlogArticle', blogArticleSchema)

module.exports = BlogArticle
