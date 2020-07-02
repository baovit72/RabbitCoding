'use strict';

var _responseHandler = require('./responseHandler');

var _entityMap = require('./entityMap');

var _readFromDb = require('./readFromDb');

var _express = require('express');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.Request = {
	DEFINE: "define",
	CONVENTION: "convention",
	EXAMPLE: "example",
	SPECIFICATION: "specification"
};

exports.iWhat = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parameters) {
		var rawResponses;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (parameters) {
							_context.next = 3;
							break;
						}

						console.log("There's no parameter ! Throw Fallback !");
						return _context.abrupt('return', 0);

					case 3:
						if (parameters.eWhat) {
							_context.next = 6;
							break;
						}

						console.log("There's nothing to answer ! Throw Fallback !");
						return _context.abrupt('return', 0);

					case 6:
						if (!parameters.eRequest[0]) {
							parameters.eRequest = ["define"];
						}

						// if (parameters.eConnector[0] == "in") {
						// 	parameters.eWhat = parameters.eWhat.filter(parentEntity => {
						// 		return parentEntityDetect(parameters.eWhat[0], parameters.eWhat[1]);
						// 	})
						// }

						console.log(parameters.eRequest, parameters.eWhat);

						_context.next = 10;
						return (0, _readFromDb.getResponseWhatIntent)(parameters.eRequest, parameters.eWhat);

					case 10:
						rawResponses = _context.sent;
						return _context.abrupt('return', (0, _responseHandler.responseHandler)(rawResponses));

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.iCompare = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parameters) {
		var rawResponses;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (parameters) {
							_context2.next = 3;
							break;
						}

						console.log("There's no parameter ! Throw Fallback !");
						return _context2.abrupt('return', 0);

					case 3:
						if (parameters.compare1) {
							_context2.next = 6;
							break;
						}

						console.log("There's nothing to answer ! Throw Fallback !");
						return _context2.abrupt('return', 0);

					case 6:

						if (parameters.eConnector[0] == "in") {
							parameters.eWhat = parameters.eWhat.filter(function (parentEntity) {
								return (0, _entityMap.parentEntityDetect)(parameters.eWhat[0], parameters.eWhat[1]);
							});
						}

						_context2.next = 9;
						return (0, _readFromDb.getResponseCompareIntent)(parameters.eRequest, parameters.compare1, parameters.compare2);

					case 9:
						rawResponses = _context2.sent;
						return _context2.abrupt('return', (0, _responseHandler.responseHandler)(rawResponses));

					case 11:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x2) {
		return _ref2.apply(this, arguments);
	};
}();