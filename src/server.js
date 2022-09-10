const { ApolloServer } = require('apollo-server-micro');
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer;

function createLambdaServer(schema) {
  const { typeDefs, resolvers } = schema;
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer(schema) {
  const { typeDefs, resolvers } = schema;
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

module.exports = { createLambdaServer, createLocalServer };
