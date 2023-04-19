import User from '../../models/user'

// module augmentation to extend new properties on an Interface
declare global {
  namespace Express {
    interface Request {
      user: User
      file: Buffer
      token: string
      params: object
    }
  }
}
