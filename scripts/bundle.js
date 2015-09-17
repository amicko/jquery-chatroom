(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

	var $text = $('#text');
	var $send = $('#send');
	var $clear = $('#clear');
	var $bottom = $('#bottom');
	var $handle = $('#handle');

	var title = $handle.val();
	var sendMessage = $text.val();

	$send.click(function () {

		var title = $handle.val();
		var sendMessage = $text.val();
		var time = new Date();

		$.post('http://tiyfe.herokuapp.com/collections/micko-chat-message/', { date: time, name: title, message: sendMessage }, function (result) {
			// console.log(title, sendMessage);
			// $bottom.append('<div>' + title + ': ' + sendMessage + '</div>');
		}, 'json');

		$text.val('');
	});

	$clear.click(function () {
		$text.val('');
		$handle.val('');

		// $.get(
		// 'http://tiyfe.herokuapp.com/collections/micko-chat-message/',
		// function(response) {
		// 	response.forEach(function(record) {
		// 		var url = 'http://tiyfe.herokuapp.com/collections/micko-chat-message/' + record._id
		// 		console.log(url);
		// 		$.ajax({
		// 			url: url,
		// 			method: 'DELETE',

		// 		})
		// 	});
		// },
		// 'json'
		// )
	});

	setInterval(function () {
		$bottom.html('');
		$.get('http://tiyfe.herokuapp.com/collections/micko-chat-message/', function (response) {
			for (var i = 0; i < response.length; i++) {
				$bottom.append('<div>' + response[i].date + '<br />' + response[i].name + ': ' + response[i].message + '</div');
			}
		});
	}, 2000);
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map