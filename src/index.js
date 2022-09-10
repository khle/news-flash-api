const cors = require('micro-cors')();
const { createLambdaServer, createLocalServer } = require('./server');
const { send } = require('micro');
const { nanoid } = require('nanoid');
const { getBookmarks, setBookmarks } = require('./bookmarks');
const { typeDefs, resolvers } = require('./schema');

const apolloServer = createLocalServer({ typeDefs, resolvers });

module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler();
  return cors((req, res) =>
    req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res),
  );
});
