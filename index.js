const express = require('express')
const userRouters = require('./users/users-router')

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.get("/", (req, res, next) => {
  res.json({
    message: "Hello my dude"
  })
})

server.use(userRouters)

server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({
    message: "Something is wrong here"
  })
})

server.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`)
})