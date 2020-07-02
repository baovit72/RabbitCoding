'use strict';

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _testDphgsxCe227079a2bc = require('/helpers/test-dphgsx-ce227079a2bc.json');

var serviceAccount = _interopRequireWildcard(_testDphgsxCe227079a2bc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

exports.database = db;

exports.getResponseWhatIntent = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eRequest, eWhat) {
		var response, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, request, getResponse;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						response = [];

						console.log("iWhatIntent");
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 5;
						_iterator = eRequest[Symbol.iterator]();

					case 7:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 15;
							break;
						}

						request = _step.value;
						_context.next = 11;
						return db.collection('responses').where('intent', '==', 'iWhat').where('parameters.eRequest', '==', request).where('parameters.' + eWhat, '==', true).get().then(function (snapshot) {
							snapshot.forEach(function (doc) {
								response.push(doc.data());
							});
						}).catch(function (err) {
							console.log(err);
						});

					case 11:
						getResponse = _context.sent;

					case 12:
						_iteratorNormalCompletion = true;
						_context.next = 7;
						break;

					case 15:
						_context.next = 21;
						break;

					case 17:
						_context.prev = 17;
						_context.t0 = _context['catch'](5);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 21:
						_context.prev = 21;
						_context.prev = 22;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 24:
						_context.prev = 24;

						if (!_didIteratorError) {
							_context.next = 27;
							break;
						}

						throw _iteratorError;

					case 27:
						return _context.finish(24);

					case 28:
						return _context.finish(21);

					case 29:
						return _context.abrupt('return', response);

					case 30:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[5, 17, 21, 29], [22,, 24, 28]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.getResponseCompareIntent = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(eRequest, compare1, compare2) {
		var response, getResponse, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, request, _getResponse;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:

						console.log("iCompareIntent");

						response = [];

						console.log(eRequest, compare1, compare2);

						if (!(eRequest[0] == "compare")) {
							_context2.next = 12;
							break;
						}

						_context2.next = 6;
						return db.collection('responses').where('intent', '==', 'iCompare').where('parameters.eRequest', '==', "same").where('parameters.' + compare1, '==', true).where('parameters.' + compare2, '==', true).get().then(function (snapshot) {
							snapshot.forEach(function (doc) {
								response.push(doc.data());
							});
						}).catch(function (err) {
							console.log(err);
						});

					case 6:
						getResponse = _context2.sent;
						_context2.next = 9;
						return db.collection('responses').where('intent', '==', 'iCompare').where('parameters.eRequest', '==', "different").where('parameters.' + compare1, '==', true).where('parameters.' + compare2, '==', true).get().then(function (snapshot) {
							snapshot.forEach(function (doc) {
								response.push(doc.data());
							});
						}).catch(function (err) {
							console.log(err);
						});

					case 9:
						getResponse = _context2.sent;
						_context2.next = 39;
						break;

					case 12:
						_iteratorNormalCompletion2 = true;
						_didIteratorError2 = false;
						_iteratorError2 = undefined;
						_context2.prev = 15;
						_iterator2 = eRequest[Symbol.iterator]();

					case 17:
						if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
							_context2.next = 25;
							break;
						}

						request = _step2.value;
						_context2.next = 21;
						return db.collection('responses').where('intent', '==', 'iCompare').where('parameters.eRequest', '==', request).where('parameters.' + compare1, '==', true).where('parameters.' + compare2, '==', true).get().then(function (snapshot) {
							snapshot.forEach(function (doc) {
								response.push(doc.data());
							});
						}).catch(function (err) {
							console.log(err);
						});

					case 21:
						_getResponse = _context2.sent;

					case 22:
						_iteratorNormalCompletion2 = true;
						_context2.next = 17;
						break;

					case 25:
						_context2.next = 31;
						break;

					case 27:
						_context2.prev = 27;
						_context2.t0 = _context2['catch'](15);
						_didIteratorError2 = true;
						_iteratorError2 = _context2.t0;

					case 31:
						_context2.prev = 31;
						_context2.prev = 32;

						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}

					case 34:
						_context2.prev = 34;

						if (!_didIteratorError2) {
							_context2.next = 37;
							break;
						}

						throw _iteratorError2;

					case 37:
						return _context2.finish(34);

					case 38:
						return _context2.finish(31);

					case 39:
						return _context2.abrupt('return', response);

					case 40:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[15, 27, 31, 39], [32,, 34, 38]]);
	}));

	return function (_x3, _x4, _x5) {
		return _ref2.apply(this, arguments);
	};
}();