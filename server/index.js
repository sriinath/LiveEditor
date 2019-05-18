"use strict";
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var opportunities_1 = require("./Resolvers/opportunities");
var opportunities_2 = require("./Schema/opportunities");
var express = require("express");
var path = require("path");
var app = express();
app.use('/build', express.static(path.resolve('./dist')));
app.use('/fonts', express.static(path.resolve('./dist/fonts')));
app.get('/', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
});
var ApollographQLServer = new apollo_server_express_1.ApolloServer({
    typeDefs: opportunities_2.typeDefs,
    resolvers: opportunities_1.resolvers
});
ApollographQLServer.applyMiddleware({ app: app });
app.listen({ port: process.env.PORT || 3000 }, function () {
    console.log("\uD83D\uDE80 Express Serverstarted");
});
