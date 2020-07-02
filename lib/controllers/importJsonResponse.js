'use strict';var _response = require('./../response.json');var jsonResponse = _interopRequireWildcard(_response);
var _readFromDb = require('./readFromDb');function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}

exports.view = function (req, res) {
	res.render('addJSONResponse');
};

exports.importJsonResponse = async function (req, res) {

	if (!jsonResponse) {
		console.log("Nothing in JSON file !");
		return 0;
	}
	try {
		for (var index in jsonResponse) {
			if (index == "default") continue;
			var response = jsonResponse[index];
			var addDoc = await _readFromDb.database.collection("responses").add(response).
			then(function (ref) {
				console.log("Added ", ref.id);
			});
		}
		res.sendStatus(200);

	} catch (err) {
		console.log(err);
	}
};