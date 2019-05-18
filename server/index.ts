import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './Resolvers/opportunities'
import { typeDefs } from './Schema/opportunities'
import * as express from 'express'
import * as path from 'path'
const app = express()

app.use('/build', express.static(path.resolve('./dist')))
app.use('/fonts', express.static(path.resolve('./dist/fonts')))
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

const ApollographQLServer = new ApolloServer({
    typeDefs,
    resolvers
})

ApollographQLServer.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 3000 }, function() {
    console.log(`🚀 Express Serverstarted`);
})
