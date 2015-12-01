(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

	Parse.initialize('YkFK8qhHXsCDzAxXZcSZjIWjSMZNhrg41yE44hMd', 'oKerLrQEXU3HWO5NiUWSVnwSQKmmg2tFZihnpRHs');
	var $text = $('#text');
	var $send = $('#send');
	var $clear = $('#clear');
	var $bottom = $('#bottom');
	var $handle = $('#handle');

	var title = $handle.val();
	var sendMessage = $text.val();

	var MessageModel = Parse.Object.extend('MessageModel');

	$send.click(function () {
		var title = $handle.val();
		var sendMessage = $text.val();
		var time = new Date();

		var NewMessage = new MessageModel({
			Title: title,
			Message: sendMessage,
			PostDate: time
		}).save();

		$bottom.html('');
		var MessageQuery = new Parse.Query(MessageModel);
		var Messages = null;

		MessageQuery.descending('createdAt').find().then(function (messages) {
			Messages = messages;

			if (!Messages) {
				console.log('Loading...');
			} else {
				var MessageList = Messages.map(function (message) {
					return $bottom.append('<div class="messageBox"><div class="time">Time Posted: ' + message.get('PostDate') + '</div><div class="handle">' + message.get('Title') + ': <div class="message">' + message.get('Message') + '</div></div></div>');
				});
			}
		});

		$text.val('');
	});

	$clear.click(function () {
		$text.val('');
		$handle.val('');
	});

	// setInterval(function() {
	$bottom.html('');
	var MessageQuery = new Parse.Query(MessageModel);
	var Messages = null;

	MessageQuery.descending('createdAt').find().then(function (messages) {
		Messages = messages;

		if (!Messages) {
			console.log('Loading...');
		} else {
			var MessageList = Messages.map(function (message) {
				return $bottom.append('<div class="messageBox"><div class="time">Time Posted: ' + message.get('PostDate') + '</div><div class="handle">' + message.get('Title') + ': <div class="message">' + message.get('Message') + '</div></div></div>');
			});
		}
	});
	// }, 2000);
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map