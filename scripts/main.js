'use strict';
var Backbone = require('backbone');
Parse.initialize('YkFK8qhHXsCDzAxXZcSZjIWjSMZNhrg41yE44hMd', 'oKerLrQEXU3HWO5NiUWSVnwSQKmmg2tFZihnpRHs');


$(document).ready(function(){
	var Router = Backbone.Router.extend({
		routes: {
			'' : 'homepage',
			'chatroom' : 'chatroom'
		},
		homepage: function() {
			$('section').hide();
			$('.homepage').show();
		},
		chatroom: function() {
			$('section').hide();
			$('.chatStarTrek').show();
		}
	});

	var r = new Router();
	Backbone.history.start();

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
					return $bottom.append('<section class="messageBox"><img class="avatar" src=""/><div class="handle">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="message">' + message.get('Message') + '</div></section>')
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
					return $bottom.append('<section class="messageBox"><img class="avatar" src=""/><div class="handle">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="message">' + message.get('Message') + '</div></section>')
				}) 
			}
		})
	// }, 2000);
})