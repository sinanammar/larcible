const AppError = require('../AppError')
const BlogArticle = require('../models/BlogArticle')

module.exports.publishArticle = async (articleContent, userId) => {
  const article = BlogArticle({ ...articleContent, creator: userId })

  await article.save()
  return article
}

module.exports.deleteArticle = async (articleId, userId) => {
  const article = await BlogArticle.findOne({
    _id: articleId,
  })
  if (!article) {
    throw new AppError('Article not found!', 404)
  }

  if (!article.creator.equals(userId)) {
    throw new AppError('unauthorized operation', 401)
  }

  await BlogArticle.deleteOne(article)

  return article
}

module.exports.addComment = async ({ content, user, articleId }) => {
  const commentData = {
    user: user,
    content: content,
  }
  const article = await BlogArticle.findByIdAndUpdate(
    articleId,
    {
      $push: { comments: commentData },
    },
    {
      new: true,
    }
  )
  if (!article) {
    throw new AppError('Something went wrong', 500)
  }

  return article
}

module.exports.addCommentReply = async ({
  content,
  user,
  commentId,
  articleId,
}) => {
  const commentData = {
    user: user,
    content: content,
  }
  const commentReply = await BlogArticle.findOneAndUpdate(
    {
      _id: articleId,
      'comments._id': commentId,
    },
    {
      $push: { 'comments.$.replies': commentData },
    },
    {
      new: true,
    }
  )

  console.log(commentReply)

  return commentReply
}

module.exports.getArticles = async () => {
  const articles = await BlogArticle.find()
  return articles
}

module.exports.getArticle = async (articleId) => {
  const article = await BlogArticle.findOne({ _id: articleId })
  if (!article) {
    throw new AppError('Article not found!', 404)
  }

  return article
}
