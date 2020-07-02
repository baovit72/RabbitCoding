'use strict';var _firebaseAdmin = require('firebase-admin');var admin = _interopRequireWildcard(_firebaseAdmin);
var _testDphgsxCe227079a2bc = require('../helpers/test-dphgsx-ce227079a2bc.json');var serviceAccount = _interopRequireWildcard(_testDphgsxCe227079a2bc);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount) });


var db = admin.firestore();

exports.database = db;

exports.getResponseWhatIntent = async function (eRequest, eWhat) {
	var response = [];
	console.log("iWhatIntent");var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
		for (var _iterator = eRequest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var request = _step.value;

			var getResponse = await db.collection('responses').where('intent', '==', 'iWhat').where('parameters.eRequest', '==', request).where('parameters.' + eWhat, '==', true).get().
			then(function (snapshot) {
				snapshot.forEach(function (doc) {
					response.push(doc.data());
				});
			}).catch(function (err) {
				console.log(err);
			});

		}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
	return response;
};

exports.getResponseCompareIntent = async function (eRequest, compare1, compare2) {

	console.log("iCompareIntent");

	var response = [];
	console.log(eRequest, compare1, compare2);
	if (eRequest[0] == "compare") {

		var getResponse = await db.collection('responses').where('intent', '==', 'iCompare').where('parameters.eRequest', '==', "same").where('parameters.' + compare1, '==', true).where('parameters.' + compare2, '==', true).get().
		then(function (snapshot) {
			snapshot.forEach(function (doc) {
				response.push(doc.data());
			});
		}).catch(function (err) {
			console.log(err);
		});
		getResponse = await db.collection('responses').where('intent', '==', 'iCompare').where('parameters.eRequest', '==', "different").where('parameters.' + compare1, '==', true).where('parameters.' + compare2, '==', true).get().
		then(function (snapshot) {
			snapshot.forEach(function (doc) {
				response.push(doc.data());
			});
		}).catch(function (err) {
			console.log(err);
		});
	} else {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
			for (var _iterator2 = eRequest[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var request = _step2.value;

				var _getResponse = await db.collection('responses').where('intent', '==', 'iCompare').where('parameters.eRequest', '==', request).where('parameters.' + compare1, '==', true).where('parameters.' + compare2, '==', true).get().
				then(function (snapshot) {
					snapshot.forEach(function (doc) {
						response.push(doc.data());
					});
				}).catch(function (err) {
					console.log(err);
				});
			}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}

	}

	return response;
};