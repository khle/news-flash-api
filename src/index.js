const cors = require('micro-cors')();
const { createLocalServer } = require('./server');
const { send } = require('micro');
const { typeDefs, resolvers } = require('./schema');
const { createDB } = require('./database');

const db = createDB();

const apolloServer = createLocalServer({ typeDefs, resolvers });

module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler();
  return cors((req, res) =>
    req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res),
  );
});
