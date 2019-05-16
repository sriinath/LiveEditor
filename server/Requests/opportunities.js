"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var console = require("console");
var getOpportunitiesData = function () {
    return node_fetch_1["default"]('https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c')
        .then(function (data) { return data.json(); })
        .then(function (response) {
        if (response && response.data && response.data.length) {
            var constructedData = response.data.slice();
            constructedData.map(function (data) {
                if (data) {
                    if (data.specifics_info && data.specifics_info.salary) {
                        data.salary = data.specifics_info.salary;
                    }
                    if (data.role_info) {
                        if (data.role_info.city) {
                            data.city = data.role_info.city;
                        }
                        if (data.role_info.selection_process) {
                            data.selection_process = data.role_info.selection_process;
                        }
                    }
                }
            });
            return constructedData;
        }
        return [];
    })["catch"](function (err) { return console.log(err); });
};
exports.getOpportunitiesData = getOpportunitiesData;
var updateOpportunitiesData = function (opportunity) {
    if (opportunity && opportunity.opportunity && opportunity.opportunity.id) {
        var id = opportunity.opportunity.id;
        delete opportunity.opportunity.id;
        opportunity.access_token = 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';
        return node_fetch_1["default"]('https://api-staging.aiesec.org/v2/opportunities/' + id, {
            method: 'patch',
            body: JSON.stringify(opportunity),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (data) { return data.json(); })
            .then(function (response) {
            console.log(response);
            return response;
        })["catch"](function (err) { return err; });
    }
    else {
        return 'id is mandatory';
    }
};
exports.updateOpportunitiesData = updateOpportunitiesData;
