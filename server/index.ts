import { ApolloServer } from 'apollo-server'
import { resolvers } from './Resolvers/opportunities'
import { typeDefs } from './Schema/opportunities'

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});