import { ApolloServer } from 'apollo-server'
import { resolvers } from './Resolvers/opportunities'
import { typeDefs } from './Schema/opportunities'

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});