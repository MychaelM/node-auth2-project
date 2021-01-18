const db = require('../database/config')

function find() {
  return db("users")
}

function findByID(id) {
  return db("users")
    .where("users.id", id)
}

function findByUsername(username) {
  return db("users")
    .where("users.username", username)
    .first()
}

async function add(user) {
  const newUser = await db("users").insert(user)
  return findByID(newUser[0])
}

module.exports = {
  find,
  findByID,
  findByUsername,
  add,
}