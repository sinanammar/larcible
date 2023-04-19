import { Document, Types } from 'mongoose'

export interface IBlogArticle extends Document {
  title: string
  body: string
  categories: string[]
  date: Date
  readingDuration: number
  creator: Types.ObjectId
  thumbnailPhoto: Buffer
  comments: Comment[]
}

export interface IComment {
  content: string
  user: Types.ObjectId
  articleId: string
  replies?: IReply[]
}

export interface IReply extends IComment {
  // content: string
  // user: Types.ObjectId
  commentId: string
  articleId: string
}

export interface IDeleteReply {
  replyId: string
  commentId: string
  articleId: string
}
