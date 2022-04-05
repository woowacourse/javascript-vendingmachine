const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(`${__dirname}/db.json`));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use(middlewares);

const rules = jsonServer.rewriter({
  // Permission rules
  users: 600,
});

// /!\ Bind the router db to the app
server.db = router.db;

// You must apply the auth middleware before the router
server.use(jsonServer.bodyParser);

server.user(auth);
server.use(router);
server.user(rules);
server.listen(port, () => {
  console.log('JSON Server is running');
});
