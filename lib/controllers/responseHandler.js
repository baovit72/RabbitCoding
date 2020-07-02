"use strict";var _dialogflowFulfillment = require("dialogflow-fulfillment");


String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

exports.responseHandler = function (responseFromDb) {
	var responses = [];
	if (responseFromDb.lenght == 0 || !Array.isArray(responseFromDb))
	return false;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
		for (var _iterator = responseFromDb[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var response = _step.value;

			var responseObject = response.response;

			console.log(response);
			console.log(responseObject);

			if (responseObject.text != undefined) {
				var textObject = responseObject.text;
				var code = "";
				var title = "";
				var content = "";

				title = "*" + title + "*\n";
				if (textObject.title) {
					title = '*' + textObject.title.replaceAll("*lb", '\n') + '* \n';
				}

				if (textObject.content) {
					content = textObject.content.replaceAll("*lb", '\n');
				}

				if (!textObject.code) {
					responses.push(title + content);
				} else {
					code = "```\n" + textObject.code.replaceAll("*lb", '\n') + "```";
					responses.push(title);
					responses.push(code);
					responses.push(content);
				}
			}
			if (responseObject.image) {
				var image = new _dialogflowFulfillment.Image({ imageUrl: responseObject.image.imageUrl });
				responses.push(image);
			}
			if (responseObject.card) {
				var card = new _dialogflowFulfillment.Card(responseObject.card);
				responses.push(card);
			}
		}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}

	var responseObj = responseFromDb[responseFromDb.length - 1];

	console.log(responseObj);


	if (responseObj.intent == "iWhat") {

		var optionList = {
			define: ["Ví dụ", "Cách khai báo", "Đặc điểm"],
			example: ["Khái niệm", "Cách khai báo", "Đặc điểm"],
			declare: ["Ví dụ", "Khái niệm", "Đặc điểm"],
			specification: ["Ưu điểm", "Nhược điểm", "Ví dụ"],
			disadvantage: ["Ưu điểm", "Đặc điểm", "Ví dụ"],
			advantage: ["Nhược điểm", "Đặc điểm", "Ví dụ"] };


		var option = optionList[responseObj.parameters.eRequest];



		var suggestion = new _dialogflowFulfillment.Suggestion({
			title: "Bạn có muốn biết thêm về ... ",
			reply: option[0] });


		suggestion.addReply_(option[1]);
		suggestion.addReply_(option[2]);


		responses.push(suggestion);

	}
	return responses;

};