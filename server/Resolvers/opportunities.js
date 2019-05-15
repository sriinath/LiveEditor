"use strict";
exports.__esModule = true;
var opportunities_1 = require("../Requests/opportunities");
var resolvers = {
    Query: {
        opportunities: function () { return opportunities_1.getOpportunitiesData(); }
    },
    Mutation: {
        updateOpportunity: function (_, opportunity, ___) {
            console.log(opportunity);
            return opportunities_1.updateOpportunitiesData(opportunity);
        }
    }
};
exports.resolvers = resolvers;
