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

/*
exports.handler = apolloServer.createHandler({
  cors: {
    origin: '*',
  },
});
*/
/*
const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return 'Hello, world!';
    },
  },
};

const getHandler = (event, context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
  });
  server.createHandler();
  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
    event.requestContext = context;
  }
  return graphqlHandler(event, context);
};

exports.handler = getHandler;
*/
