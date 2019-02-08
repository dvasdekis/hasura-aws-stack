const ApolloServerLambda = require('apollo-server-lambda').ApolloServer;
const typeDefs = require(./index).typeDefs;
const resolvers = require(./index).resolvers;

const server = new ApolloServerLambda({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    }),
});

exports.handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization'
    },
});

