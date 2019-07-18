const jsonServer = require('json-server')
const server = jsonServer.create()
const serverless = require('serverless-http')

const request = async () => {
  try {
    const router = jsonServer.router('../db.json')
    const middlewares = jsonServer.defaults({
      readOnly: process.env.READONLY === 'true'
    })
    server.use(middlewares)
    server.use(router)
  } catch (e) {
    console.log(e.message)
  }
}

const handler = serverless(server)
module.exports.handler = async (event, context) => {
  const result = await handler(event, context)
  return result
}

function start() {
  // start the web server
  const port = 3000
  return server.listen(port, () => {
    console.log(
      `JSON Server is running under port 3000. Use http://localhost:${port} to access it`
    )
  })
}

if (require.main === module) {
  request()
  start()
}
