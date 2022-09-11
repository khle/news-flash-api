/*
const { typeDefs, resolvers } = require('./bundle/schema');
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
*/

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
