const AppError = require('../AppError')
const BlogArticle = require('../models/BlogArticle')

module.exports.publishArticle = async (articleContent, userId) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
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
    user,
    content,
  }
  const article = await BlogArticle.findByIdAndUpdate(
    articleId,
    {
      $push: { comments: commentData },
    },
    {
      new: true,
    },
  )
  if (!article) {
    throw new AppError('Something went wrong', 500)
  }

  return article
}

module.exports.addCommentReply = async ({ content, user, commentId, articleId }) => {
  const commentData = {
    user,
    content,
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
    },
  )

  if (!commentReply) {
    throw new AppError('Comment not found!', 404)
  }

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

module.exports.deleteComment = async (articleId, commentId) => {
  const article = await BlogArticle.findById({ _id: articleId })

  if (!article) {
    throw new AppError('Article not found!', 404)
  }

  // pull emoves all instances of an element from an array.
  article.comments.pull({ _id: commentId })
  await article.save()
  return true
}

module.exports.deleteCommentReply = async ({ articleId, commentId, replyId }) => {
  const article = await BlogArticle.findById({ _id: articleId })

  if (!article) {
    throw new AppError('Article not found!', 404)
  }

  // .id() returns a document subdocument with the given _id. This method only works for subdocuments.
  const comment = article.comments.id(commentId)

  if (!comment) {
    throw new AppError('Comment not found', 404)
  }

  const deletedReply = comment.replies.pull({ _id: replyId })

  if (deletedReply.length) {
    throw new AppError('Something went wrong!', 400)
  }
  await article.save()

  // Ask about the appropiate reposnse to send
  // if the client is not receiving the article back true or the article object
  return true
}
