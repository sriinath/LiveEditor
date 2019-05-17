import { ApolloServer } from 'apollo-server'
import { resolvers } from './Resolvers/opportunities'
import { typeDefs } from './Schema/opportunities'
import express from 'express'
const app = express()

const ApollographQLServer = new ApolloServer({
    typeDefs,
    resolvers
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../dist/index.html')
})

app.listen({ port: process.env.PORT || 3000 }, function() {
    console.log(`🚀 Express Serverstarted`);
})

ApollographQLServer.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});