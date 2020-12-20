const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class User {
  constructor (email, firstName, lastName, password) {
    this._id = null
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.password = password
    this.finances = []
  }

  static findById (userId) {
    const db = getDb()
    return db.collection('users').findOne({ _id: ObjectId(userId) })
      .then(user => {
        console.log(user)
        return user
      })
      .catch(err => {
        console.log(err)
      })
  }

  // static getUserFinances () {
  //   const db = getDb()
  //   console.log(`DB: ${db}`)
  //   return db.collection('users').find().toArray()
  // }
}

module.exports = User
