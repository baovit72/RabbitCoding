'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dialogflowFulfillmentWebhook = require('../controllers/dialogflowFulfillmentWebhook');

var _importJsonResponse = require('../controllers/importJsonResponse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import jsonParser from 'body-parser'
var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Fulfillment Dialogflow Webhook
router.post('/webhook', _dialogflowFulfillmentWebhook.dialogflowFulfillmentWebhook);

// Add response database 
router.get('/addResponseToDb', _importJsonResponse.importJsonResponse);

module.exports = router;