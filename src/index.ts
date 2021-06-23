import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import resolvers from './resolvers';
import config from './config';
import { myslqWrapper } from './models/wrapper';
import { createServer } from 'http';

(async () => {
  await myslqWrapper.connect(config.mysql);

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: true,
    }),
    subscriptions: {
      path: '/subscriptions',
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(config.port, () => {
    console.log(
      `Subscriptions ready at ws://localhost:${config.port}${apolloServer.subscriptionsPath}`
    );
    console.log(`server started at http://localhost:${config.port}/graphql`);
  });
})();
