const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    throw error
  }
  const token = req.get('Authorization').split(' ')[1]
  let decodedToken
  jwt.verify(token, process.env.SECRET_KEY)
    .then(decodedToken => {
      if (!decodedToken) {
        const error = new Error('Unable to authenticate.')
        error.statusCode = 401
        throw error
      }
      req.userId = decodedToken.userId
      next()
    })
    .catch(err => {
      err.statusCode = 401
      throw err
    })
}
