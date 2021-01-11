const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    console.log()
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    throw error
  }
  const token = req.get('Authorization').split(' ')[1]
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  } catch (err) {
    console.log(`In catch block token: ${token}`)
    err.statusCode = 500
    throw err
  }
  if (!decodedToken) {
    const error = new Error('Unable to authenticate.')
    error.statusCode = 401
    throw error
  }
  req.userId = decodedToken.userId
  next()
}
