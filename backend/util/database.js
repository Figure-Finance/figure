require('dotenv').config()

const mongoUri = process.env.MONGODB_URI
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(mongoUri, (err, db) => {
    _db = db.db('figure_db')
    if (err) {
      throw err
    }
  })
  // .then(client => {
  //   console.log('Connected!')
  //   _db = client.db
  //   console.log(`client.db: ${_db.dbName}`)
  //   callback()
  // })
  // .catch(err => {
  //   console.log(err)
  //   throw err
  // })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
