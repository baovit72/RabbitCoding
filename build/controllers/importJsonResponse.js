'use strict';

var _response = require('../response.json');

var jsonResponse = _interopRequireWildcard(_response);

var _readFromDb = require('../controllers/readFromDb');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.view = function (req, res) {
	res.render('addJSONResponse');
};

exports.importJsonResponse = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var index, response, addDoc;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (jsonResponse) {
							_context.next = 3;
							break;
						}

						console.log("Nothing in JSON file !");
						return _context.abrupt('return', 0);

					case 3:
						_context.prev = 3;
						_context.t0 = regeneratorRuntime.keys(jsonResponse);

					case 5:
						if ((_context.t1 = _context.t0()).done) {
							_context.next = 15;
							break;
						}

						index = _context.t1.value;

						if (!(index == "default")) {
							_context.next = 9;
							break;
						}

						return _context.abrupt('continue', 5);

					case 9:
						response = jsonResponse[index];
						_context.next = 12;
						return _readFromDb.database.collection("responses").add(response).then(function (ref) {
							console.log("Added ", ref.id);
						});

					case 12:
						addDoc = _context.sent;
						_context.next = 5;
						break;

					case 15:
						res.sendStatus(200);

						_context.next = 21;
						break;

					case 18:
						_context.prev = 18;
						_context.t2 = _context['catch'](3);

						console.log(_context.t2);

					case 21:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[3, 18]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();