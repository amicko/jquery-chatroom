'use strict';
var Backbone = require('backbone');
Parse.initialize("p6LVR6361z3dnHn8SMi8n5Vca7yeUaW4wwXuUnjP", "IFuhIp6PfZJQgP9J3pXECV3M5J42jSkpP7mx9rki");

$(document).ready(function(){
	var Router = Backbone.Router.extend({
		routes: {
			'' : 'homepage',
			'register' : 'register',
			'loginST' : 'loginST',
			'chatroom' : 'chatroom'
		},
		homepage: function() {
			$('section').hide();
			$('.homepage').show();
			if(Parse.User.current()) {
				Parse.User.logOut();
			}
		},
		register: function() {
			$('section').hide();
			$('.register').show();
			$('.primeDirectives').show();
			$('.internalData').hide();
			if(Parse.User.current()) {
				Parse.User.logOut();
			}
		},
		loginST: function() {
			$('section').hide();
			$('.loginStarTrek').show();
			if(Parse.User.current()) {
				Parse.User.logOut();
			}
		},
		chatroom: function() {
			$('section').hide();
			$('.chatStarTrek').show();
			if(!Parse.User.current()) {
				r.navigate('', {trigger: true});
			}
		}
	});

	var r = new Router();
	Backbone.history.start();

	$('.next1').click(function() {
		$('.primeDirectives').hide();
		$('.internalData').show();
	})

	$('.next2').click(function() {
		var user = new Parse.User();
		user.signUp(
			{
				username: $('#username').val(),
				password: $('#password1').val(),
				screenName: $('#screenName').val(),
				email: $('#email').val(),
				genre: $('#genre').val(),
				newsletter: $('#newsletter').val(),
				birthYear: $('#year').val(),
				birthMonth: $('#month').val(),
				birthDay: $('#day').val()
			},
			{
				success: (u) => {
					console.log('User Registered')
				},
				error: (u, error) => {
					console.log('User Not Registered')
				}
			}
		);

	})

	$('.back1').click(function() {
		$('.primeDirectives').show();
		$('.internalData').hide();
	})

	$('#loginChatST').click(function() {
		var user = Parse.User.current();
		var avatar = $('#loginAvatar').val()

		Parse.User.logIn(
			$('#loginName').val(),
			$('#loginPassword').val(),
			{
				success: (u) => {

				},
				error: (u, error) => {
					console.log('Error')
				}
			}
		);

		setTimeout(function() {
				Parse.User.current().set('avatar', $('#loginAvatar').val());
				Parse.User.current().set('handle', $('#loginHandle').val());
				Parse.User.current().save(null, {
					success: function(user) {
						r.navigate('chatroom', {trigger: true});
						location.reload();
					}
				});
		}, 500);
	})

	$('#loginAvatar').click(function() {
		// console.log($('#loginAvatar').val())
		console.log('Select Clicked')
		$('#avvyPic').css('background-image', 'url(../' + $('#loginAvatar').val() + ')')
	})

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

		var MessageRecipient = '';
		if($('#to').val() !== '') {
			MessageRecipient = $('#to').val() + ': '
		}
		else {
			MessageRecipient = $('#to').val() + '';
		}

		var NewMessage = new MessageModel({
			Title: Parse.User.current().get('handle'),
			To: MessageRecipient,
			Message: sendMessage,
			PostDate: time,
			Image: Parse.User.current().get('avatar')
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
					return $bottom.append('<section class="messageBox"><img class="avatar" src="' + message.get('Image') + '"/><div class="handle">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="message"><span id="toMessage">' + message.get('To') + '</span> ' + message.get('Message') + '</div></section>')
				}) 
			}
		})

		$text.val('');
	})

	$('#receive').click(function() {
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
					return $bottom.append('<section class="messageBox"><img class="avatar" src="' + message.get('Image') + '"/><div class="handle">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="message"><span id="toMessage">' + message.get('To') + '</span> ' + message.get('Message') + '</div></section>')
				}) 
			}
		})
	})

	$clear.click(function() {
		$text.val('');
		$('#to').val('');
	})

	$('#exit').click(function() {
		Parse.User.logOut();
		r.navigate('', {trigger: true});
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
					return $bottom.append('<section class="messageBox"><img class="avatar" src="' + message.get('Image') + '"/><div class="handle">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="message"><span id="toMessage">' + message.get('To') + '</span> ' + message.get('Message') + '</div></section>')
				}) 
			}
		})
	// }, 2000);
})