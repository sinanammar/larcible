class AppError extends Error {
  statusCode: number
  constructor(message: any, statusCode: any) {
    super(message)
    this.statusCode = statusCode
  }
}

export default AppError
