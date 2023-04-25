import AppError from '../AppError'

// Models
import BlogArticle from '../models/BlogArticle'

// Interfaces
import {
  IComment,
  IReply,
  IBlogArticle,
  IDeleteReply,
} from '../interfaces/blog.Interface'

const publishArticle = async (articleContent: IBlogArticle, userId: string) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const article = new BlogArticle({ ...articleContent, creator: userId })

  await article.save()
  return article
}

const deleteArticle = async (articleId: string, userId: string) => {
  const article: any = await BlogArticle.findOne({
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

const addComment = async ({ content, user, articleId }: IComment) => {
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

const addCommentReply = async ({ content, user, commentId, articleId }: IReply) => {
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

  return commentReply
}

const getArticles = async ({
  startIndex,
  next,
}: {
  startIndex: number
  next: { limit: number; page: number }
}) => {
  const articles = await BlogArticle.find().limit(next.limit).skip(startIndex)
  return articles
}

const getArticle = async (articleId: string) => {
  const article = await BlogArticle.findOne({ _id: articleId })
  if (!article) {
    throw new AppError('Article not found!', 404)
  }

  return article
}

const deleteComment = async (articleId: string, commentId: string) => {
  const article = await BlogArticle.findById({ _id: articleId })

  if (!article) {
    throw new AppError('Article not found!', 404)
  }

  // pull removes all instances of an element from an array.
  // @ts-ignore
  article.comments.pull({ _id: commentId })
  await article.save()
  return true
}

const deleteCommentReply = async ({ articleId, commentId, replyId }: IDeleteReply) => {
  const article = await BlogArticle.findById({ _id: articleId })

  if (!article) {
    throw new AppError('Article not found!', 404)
  }

  // .id() returns a document subdocument with the given _id. This method only works for subdocuments.
  // @ts-ignore
  const comment: IComment = article.comments.id(commentId)

  if (!comment) {
    throw new AppError('Comment not found', 404)
  }

  // TODO: I can get the comment delete in JS code and save the instance again without using .pull
  // @ts-ignore
  const deletedReply: IComment[] = comment.replies!.pull({ _id: replyId })

  if (deletedReply.length) {
    throw new AppError('Something went wrong!', 400)
  }
  await article.save()

  // Ask about the appropiate reposnse to send
  // if the client is not receiving the article back true or the article object
  return true
}

export default {
  publishArticle,
  deleteArticle,
  addComment,
  addCommentReply,
  getArticles,
  getArticle,
  deleteComment,
  deleteCommentReply,
}
