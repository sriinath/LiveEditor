"use strict";
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var opportunities_1 = require("./Resolvers/opportunities");
var opportunities_2 = require("./Schema/opportunities");
var express = require("express");
var path = require("path");
var app = express();
app.get('/', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
});
app.listen({ port: process.env.PORT || 3000 }, function () {
    console.log("\uD83D\uDE80 Express Serverstarted");
});
var ApollographQLServer = new apollo_server_1.ApolloServer({
    typeDefs: opportunities_2.typeDefs,
    resolvers: opportunities_1.resolvers
});
ApollographQLServer.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 GraphQL Server ready at " + url);
});
