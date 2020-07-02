'use strict';var _dialogflowFulfillment = require('dialogflow-fulfillment');
var _requestHandler = require('./requestHandler');



exports.dialogflowFulfillmentWebhook = async function (req, res) {

	// Parse the request body from the POST
	var agent = new _dialogflowFulfillment.WebhookClient({ request: req, response: res });

	//Handler for Fallback Intent
	var fallback = function fallback() {
		res.sendStatus(400).send("No response for this request ! Throw to Fallback intent !");
	};

	// Add respone to return for Dialogflow
	var addResponse = function addResponse(responses) {
		if (responses.length == 0) {
			return false;
		}var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
			for (var _iterator = responses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var response = _step.value;
				console.log(response);
				agent.add(response);
			}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
		return true;

	};

	// Handler for iWhat intent
	var iWhatHandler = async function iWhatHandler() {
		try {
			var responses = await (0, _requestHandler.iWhat)(agent.parameters);
			if (!addResponse(responses)) {
				return fallback;
			}
			agent.setContext({ name: "iwhat-extra", lifespan: 10, parameters: agent.parameters });


		} catch (err) {
			console.log(err);
			return fallback;
		}

	};

	// Handler for iWhatExtra intent
	var iWhatExtraHandler = async function iWhatExtraHandler() {
		try {
			var extraContext = agent.getContext("iwhat-extra");
			var responses = await (0, _requestHandler.iWhat)(extraContext.parameters);
			addResponse(responses);
		} catch (err) {
			console.log(err);
			return fallback;
		}
	};

	// Handler for iCompare intent
	var iCompareHandler = async function iCompareHandler() {
		try {
			var responses = await (0, _requestHandler.iCompare)(agent.parameters);
			if (!addResponse(responses)) {
				return fallback;
			}
		} catch (err) {
			console.log(err);
			return fallback;
		}

	};

	var intentMap = new Map();


	//Set handler for each Intent
	intentMap.set('iWhat', iWhatHandler);
	intentMap.set('iWhat-Extra', iWhatExtraHandler);
	intentMap.set('iCompare', iCompareHandler);


	agent.handleRequest(intentMap);

};