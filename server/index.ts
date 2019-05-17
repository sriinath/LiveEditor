import { ApolloServer } from 'apollo-server'
import { resolvers } from './Resolvers/opportunities'
import { typeDefs } from './Schema/opportunities'
import * as express from 'express'
import * as path from 'path'
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})
app.listen({ port: process.env.PORT || 3000 }, function() {
    console.log(`🚀 Express Serverstarted`);
})

const ApollographQLServer = new ApolloServer({
    typeDefs,
    resolvers
})

ApollographQLServer.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});