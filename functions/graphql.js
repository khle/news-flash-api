const { typeDefs, resolvers } = require('./bundle/schema');
const { createLambdaServer } = require('./bundle/server');

const getHandler = (event, context) => {
  const apolloServer = createLambdaServer({
    typeDefs,
    resolvers,
    debug: true,
  });
  apolloServer.createHandler();
  const graphqlHandler = apolloServer.createHandler();
  if (!event.requestContext) {
    event.requestContext = context;
  }
  return graphqlHandler(event, context);
};

exports.handler = getHandler;
