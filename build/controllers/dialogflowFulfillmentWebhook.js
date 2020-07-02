'use strict';

var _dialogflowFulfillment = require('dialogflow-fulfillment');

var _requestHandler = require('./requestHandler');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.dialogflowFulfillmentWebhook = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
		var agent, fallback, addResponse, iWhatHandler, iWhatExtraHandler, iCompareHandler, intentMap;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:

						// Parse the request body from the POST
						agent = new _dialogflowFulfillment.WebhookClient({ request: req, response: res });

						//Handler for Fallback Intent

						fallback = function fallback() {
							res.sendStatus(400).send("No response for this request ! Throw to Fallback intent !");
						};

						// Add respone to return for Dialogflow


						addResponse = function addResponse(responses) {
							if (responses.length == 0) {
								return false;
							}
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;

							try {
								for (var _iterator = responses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var response = _step.value;

									console.log(response);
									agent.add(response);
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator.return) {
										_iterator.return();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}

							return true;
						};

						// Handler for iWhat intent


						iWhatHandler = function () {
							var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
								var responses;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.prev = 0;
												_context.next = 3;
												return (0, _requestHandler.iWhat)(agent.parameters);

											case 3:
												responses = _context.sent;

												if (addResponse(responses)) {
													_context.next = 6;
													break;
												}

												return _context.abrupt('return', fallback);

											case 6:
												agent.setContext({ name: "iwhat-extra", lifespan: 10, parameters: agent.parameters });

												_context.next = 13;
												break;

											case 9:
												_context.prev = 9;
												_context.t0 = _context['catch'](0);

												console.log(_context.t0);
												return _context.abrupt('return', fallback);

											case 13:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined, [[0, 9]]);
							}));

							return function iWhatHandler() {
								return _ref2.apply(this, arguments);
							};
						}();

						// Handler for iWhatExtra intent


						iWhatExtraHandler = function () {
							var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
								var extraContext, responses;
								return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												_context2.prev = 0;
												extraContext = agent.getContext("iwhat-extra");
												_context2.next = 4;
												return (0, _requestHandler.iWhat)(extraContext.parameters);

											case 4:
												responses = _context2.sent;

												addResponse(responses);
												_context2.next = 12;
												break;

											case 8:
												_context2.prev = 8;
												_context2.t0 = _context2['catch'](0);

												console.log(_context2.t0);
												return _context2.abrupt('return', fallback);

											case 12:
											case 'end':
												return _context2.stop();
										}
									}
								}, _callee2, undefined, [[0, 8]]);
							}));

							return function iWhatExtraHandler() {
								return _ref3.apply(this, arguments);
							};
						}();

						// Handler for iCompare intent


						iCompareHandler = function () {
							var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
								var responses;
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												_context3.prev = 0;
												_context3.next = 3;
												return (0, _requestHandler.iCompare)(agent.parameters);

											case 3:
												responses = _context3.sent;

												if (addResponse(responses)) {
													_context3.next = 6;
													break;
												}

												return _context3.abrupt('return', fallback);

											case 6:
												_context3.next = 12;
												break;

											case 8:
												_context3.prev = 8;
												_context3.t0 = _context3['catch'](0);

												console.log(_context3.t0);
												return _context3.abrupt('return', fallback);

											case 12:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, undefined, [[0, 8]]);
							}));

							return function iCompareHandler() {
								return _ref4.apply(this, arguments);
							};
						}();

						intentMap = new Map();

						//Set handler for each Intent

						intentMap.set('iWhat', iWhatHandler);
						intentMap.set('iWhat-Extra', iWhatExtraHandler);
						intentMap.set('iCompare', iCompareHandler);

						agent.handleRequest(intentMap);

					case 11:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();