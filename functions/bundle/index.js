const cors = require('micro-cors')();
const { createLambdaServer, createLocalServer } = require('./server');
const { send } = require('micro');
const { nanoid } = require('nanoid');
const { getBookmarks, setBookmarks } = require('./bookmarks');
const { typeDefs, resolvers } = require('./schema');
const { getCollection, initDB, getDB } = require('lokijs-promise');

// Always run this at the start/top of your app to instantiate the DB
// A file called v1.json will be created in your project repo and will be used as the DB,
//and it will have an autosave interval of 1000ms (1 second, essentially)
initDB('v1.json', 1000);

const apolloServer = createLocalServer({ typeDefs, resolvers });

module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler();
  return cors((req, res) =>
    req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res),
  );
});
