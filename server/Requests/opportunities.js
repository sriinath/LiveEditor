"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var accessToken = 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';
var getOpportunitiesAPI = 'https://api-staging.aiesec.org/v2/opportunities';
var getBackgroundsAPI = 'https://api-staging.aiesec.org/v2/lists/backgrounds';
var updateOpportunitiesAPI = 'https://api-staging.aiesec.org/v2/opportunities/';
var getOpportunitiesData = function () {
    return Promise.all([
        node_fetch_1["default"](getOpportunitiesAPI + "?access_token=" + accessToken),
        node_fetch_1["default"](getBackgroundsAPI + "?access_token=" + accessToken)
    ])
        .then(function (data) { return Promise.all(data.map(function (response) { return response.json(); })); })
        .then(function (dataArr) {
        var response = {};
        if (dataArr && dataArr.length) {
            if (dataArr[0]) {
                response.opportunitiesData = dataArr[0];
            }
            if (dataArr[1] && dataArr[1].length) {
                response.backgroundsData = dataArr[1];
            }
        }
        if (response && response.opportunitiesData && response.opportunitiesData.data && response.opportunitiesData.data.length) {
            var constructedData = response.opportunitiesData.data.slice();
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
                    if (response.backgroundsData) {
                        data.backgroundsData = response.backgroundsData;
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
        opportunity.access_token = accessToken;
        return node_fetch_1["default"](updateOpportunitiesAPI + id, {
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
