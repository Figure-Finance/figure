// Require jsonwebtoken
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // Grab our Authorization header from request
  const authHeader = req.get('Authorization')
  // If we don't have an auth header, throw 401 'not authenticated'
  if (!authHeader) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    throw error
  }
  // Authorization header is in format: 'Bearer <token>'
  // Grab token from header
  const token = req.get('Authorization').split(' ')[1]
  // Initialize variable for decodedToken to access within chained .then() scope
  let decodedToken
  // Verify our token with jsonwebtoken library
  jwt.verify(token, process.env.SECRET_KEY)
    .then(decodedToken => {
      // If malformed or otherwise not valid, throw 401 'not authenticated'
      if (!decodedToken) {
        const error = new Error('Unable to authenticate.')
        error.statusCode = 401
        throw error
      }
      // Set the request userId for use in rest of middleware
      req.userId = decodedToken.userId
      next()
    })
    .catch(err => {
      err.statusCode = 401
      throw err
    })
}
