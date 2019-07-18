const express = require('express')
const serverStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
app.use('/', serverStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)

console.log('Listening port: ' + port)

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
