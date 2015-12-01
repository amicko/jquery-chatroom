'use strict';

$(document).ready(function(){

	Parse.initialize('YkFK8qhHXsCDzAxXZcSZjIWjSMZNhrg41yE44hMd', 'oKerLrQEXU3HWO5NiUWSVnwSQKmmg2tFZihnpRHs');
	var $text = $('#text');
	var $send = $('#send');
	var $clear = $('#clear');
	var $bottom = $('#bottom');
	var $handle = $('#handle');

	var title = $handle.val();
	var sendMessage = $text.val();

	var MessageModel = Parse.Object.extend('MessageModel');
	
	$send.click(function() {
		var title = $handle.val();
		var sendMessage = $text.val();
		var time = new Date();

		var NewMessage = new MessageModel({
			Title: title,
			Message: sendMessage,
			PostDate: time
		}).save()

		$bottom.html('');
		var MessageQuery = new Parse.Query(MessageModel);
		var Messages = null;

		MessageQuery.descending('createdAt').find().then(function(messages) {
			Messages = messages

			if(!Messages) {
				console.log('Loading...')
			}
			else {
				var MessageList = Messages.map(function(message) {
					return $bottom.append('<div class="messageBox"><div class="time">Time Posted: ' + message.get('PostDate') + '</div><div class="handle">' + message.get('Title') + ': <div class="message">' + message.get('Message') + '</div></div></div>')
				}) 
			}
		})

		$text.val('');
	})

	$clear.click(function() {
		$text.val('');
		$handle.val('');
	})

	// setInterval(function() {
		$bottom.html('');
		var MessageQuery = new Parse.Query(MessageModel);
		var Messages = null;

		MessageQuery.descending('createdAt').find().then(function(messages) {
			Messages = messages

			if(!Messages) {
				console.log('Loading...')
			}
			else {
				var MessageList = Messages.map(function(message) {
					return $bottom.append('<div class="messageBox"><div class="time">Time Posted: ' + message.get('PostDate') + '</div><div class="handle">' + message.get('Title') + ': <div class="message">' + message.get('Message') + '</div></div></div>')
				}) 
			}
		})
	// }, 2000);
})