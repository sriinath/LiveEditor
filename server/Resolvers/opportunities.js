"use strict";
exports.__esModule = true;
var opportunities_1 = require("../Requests/opportunities");
var resolvers = {
    Query: {
        opportunities: function () { return opportunities_1.getOpportunitiesData(); }
    }
};
exports.resolvers = resolvers;
