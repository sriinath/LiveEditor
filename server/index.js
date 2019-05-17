"use strict";
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var opportunities_1 = require("./Resolvers/opportunities");
var opportunities_2 = require("./Schema/opportunities");
var server = new apollo_server_1.ApolloServer({
    typeDefs: opportunities_2.typeDefs,
    resolvers: opportunities_1.resolvers
});
server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
