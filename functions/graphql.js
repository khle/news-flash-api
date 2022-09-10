const { typeDefs, resolvers } = require('../src/schema');
const { createLambdaServer } = require('./bundle/server');

const apolloServer = createLambdaServer({
  typeDefs,
  resolvers,
});

exports.handler = apolloServer.createHandler({
  cors: {
    origin: '*',
  },
});
