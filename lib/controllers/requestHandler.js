'use strict';var _responseHandler = require('./responseHandler');

var _entityMap = require('./entityMap');

var _readFromDb = require('./readFromDb');
var _express = require('express');



exports.Request = {
	DEFINE: "define",
	CONVENTION: "convention",
	EXAMPLE: "example",
	SPECIFICATION: "specification" };


exports.iWhat = async function (parameters) {

	if (!parameters) {
		console.log("There's no parameter ! Throw Fallback !");
		return 0;
	}

	if (!parameters.eWhat) {
		console.log("There's nothing to answer ! Throw Fallback !");
		return 0;
	}
	if (!parameters.eRequest[0]) {
		parameters.eRequest = [
		"define"];

	}

	// if (parameters.eConnector[0] == "in") {
	// 	parameters.eWhat = parameters.eWhat.filter(parentEntity => {
	// 		return parentEntityDetect(parameters.eWhat[0], parameters.eWhat[1]);
	// 	})
	// }

	console.log(parameters.eRequest, parameters.eWhat);

	var rawResponses = await (0, _readFromDb.getResponseWhatIntent)(parameters.eRequest, parameters.eWhat);

	return (0, _responseHandler.responseHandler)(rawResponses);

};


exports.iCompare = async function (parameters) {

	if (!parameters) {
		console.log("There's no parameter ! Throw Fallback !");
		return 0;
	}

	if (!parameters.compare1) {
		console.log("There's nothing to answer ! Throw Fallback !");
		return 0;
	}


	if (parameters.eConnector[0] == "in") {
		parameters.eWhat = parameters.eWhat.filter(function (parentEntity) {
			return (0, _entityMap.parentEntityDetect)(parameters.eWhat[0], parameters.eWhat[1]);
		});
	}

	var rawResponses = await (0, _readFromDb.getResponseCompareIntent)(parameters.eRequest, parameters.compare1, parameters.compare2);

	return (0, _responseHandler.responseHandler)(rawResponses);

};