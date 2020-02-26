const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Election = require('./resolvers/Election');
const Ballot = require('./resolvers/Ballot');
const Trail = require('./resolvers/Trail');
const db = require('./db');

// Create GraphQL yoga server
function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
      Trail,
      Election,
      Ballot,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  });
}

module.exports = createServer;
