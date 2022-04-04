const jsonServer = require('json-server')
const server = jsonServer.create()
const auth = require('json-server-auth')
const cors = require("cors")

const path = require('path')

const router = jsonServer.router(path.join(__dirname,'db.json'))

const middlewares = jsonServer.defaults()

const port = process.env.PORT || 3000;

server.use(middlewares)

const customRouter = jsonServer.rewriter({
    "/api/*": "/$1",
    "/findUser\\?name=:name": "/users/?name=:name"
})

server.db = router.db

server.use(cors())
server.use(auth)
server.use(customRouter)
server.use(router)

server.listen(port, () => {
  console.log('JSON Server is running')
})
