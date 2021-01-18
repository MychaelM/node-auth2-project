const db = require('../database/config')

function find(){
  return db("users")
}

module.exports = {
  find,
}