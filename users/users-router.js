const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./users-model')
const { restrict } = require('./users-middleware')

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
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
    const { username, password, department } = req.body
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

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findByUsername(username)

    if(!user) {
      return res.status(401).json({
        message: "Invalid Creds bruh"
      })
    }
    // console.log(password, user.password)
    const passwordValid = await bcrypt.compare(password, user.password)

    if(!passwordValid) {
      return res.status(401).json({
        message: "Password is not right man"
      })
    }

   const token = jwt.sign(
     {
       userID: user.id,
       userDept: user.department
     },
     process.env.JWT_SECRET
   )

   res.json({
     message: `Welcome ${user.username}`,
     token: token
   })

  } catch(err) {
    next(err)
  }
})

module.exports = router