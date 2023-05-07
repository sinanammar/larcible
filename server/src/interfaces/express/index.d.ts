import User from '../../models/user'
import { IUser } from '../user.interface'

// module augmentation to extend new properties on an Interface
declare global {
  namespace Express {
    interface Request {
      user: IUser
      fileName: string
      token: string
      params: object
      paginationInfo: any
    }
  }
}
