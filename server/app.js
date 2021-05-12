const express = require('express');
const compression = require('compression');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { PubSub } = require('graphql-subscriptions');
const { JWT_SECRET, PORT } = process.env
const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET)
    }
    return null
  } catch (error) {
    return null
  }
}

async function init() {
  const app = express();
  const pubsub = new PubSub();

  app.use('*', cors());

  app.use(compression());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.get('Authorization') || ''
      return { pubsub, user: getUser(token.replace('Bearer', '')) }
    },
    introspection: true,
    playground: true
  })

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4100;
  const httpServer = createServer(app);
  httpServer.listen(
    { port: PORT },
    () => {
      console.log(`test_store API with GraphQL online http://localhost:${PORT}`)
      console.log(`Server ready at ws://localhost:${PORT}`);
    }
  );
}

init();