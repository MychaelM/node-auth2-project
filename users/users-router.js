const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require('./users-model')

const router = express.Router()

router.get("/users", async (req, res, next) => {
  try{
    res.status(200).json(await Users.find())
  } catch(err){
    next(err)
  }
})

router.get("/users/:id", async (req, res, next) => {
  try{
    res.status(200).json(await Users.findByID(req.params.id))
  } catch(err){
    next(err)
  }
})

router.post("/users", async (req, res, next) => {
  try{
    const {username, password, department} = req.body
    const user = await Users.findByUsername(username)

    if(user) {
      return res.status(409).json({
        message: "Username is already in the system silly"
      })
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 15),
      department
    })

    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
})

module.exports = router