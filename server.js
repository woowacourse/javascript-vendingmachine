const jsonServer = require('json-server')
const server = jsonServer.create()
const auth = require('json-server-auth')

const path = require('path')

const router = jsonServer.router(path.join(__dirname,'db.json'))

const middlewares = jsonServer.defaults()

const customMiddlewares = require(path.join(__dirname, 'auth-middleware.js'))

const port = process.env.PORT || 3000;

server.use(middlewares)
server.use(customMiddlewares)

const customRouter = jsonServer.rewriter({
    "/api/*": "/$1",
    "/:resource/:id/show": "/:resource/:id",
    "/posts/:category": "/posts?category=:category",
    "/articles\\?id=:id": "/posts/:id",
    "/findUser\\?name=:name": "/users/?name=:name"
})


server.use(auth)
server.use(customRouter)
server.use(router)

server.listen(port, () => {
  console.log('JSON Server is running')
})
