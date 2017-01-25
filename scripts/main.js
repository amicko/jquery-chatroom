'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
// Parse.initialize("p6LVR6361z3dnHn8SMi8n5Vca7yeUaW4wwXuUnjP", "IFuhIp6PfZJQgP9J3pXECV3M5J42jSkpP7mx9rki");
Parse.initialize('p6LVR6361z3dnHn8SMi8n5Vca7yeUaW4wwXuUnjP','unused');
Parse.serverURL = 'https://otf-replica.herokuapp.com/parse';

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

	// var obj = new Parse.Object('MessageModel');
	// var query = new Parse.Query('MessageModel');
	// query.get(obj.id).then(function(objAgain) {
	// 	console.log(objAgain.toJSON());
	// }, function(err) {console.log(err); });
	// console.log('test');

	//New Parse code example:
	var obj = Parse.Object.extend('MessageModel');
	var test = [];
	console.log(obj);
	// obj.set('Message','Test');
	// obj.save().then(function(obj) {
	  // console.log(obj.toJSON());
	  var query = new Parse.Query('MessageModel');
	  query.get(obj).then(function(objAgain) {
	    console.log(objAgain.toJSON());
	    test = objAgain;
	    console.log(test);
	  }, function(err) {console.log(err); });
	// }, function(err) { console.log(err); });

	//Registration events
	$('.next1').click(function() {
		$('.primeDirectives').hide();
		$('.internalData').show();
	})

	$('.next2').click(function() {
		var $username = $('#username').val();
		var $password1 = $('#password1').val();
		var $password2 = $('#password2').val();
		var $screenName = $('#screenName').val();
		var $email = $('#email').val();
		var regex = /^[0-9A-Za-z]+$/;

		var validUsernameLength = false;
		var validUsernameContent = false;
		var validpasswordMatch = false;
		var validPasswordLength = false;
		var validScreenNameLength = false;
		var validEmailLength = false;

		if($username.length < 5) {
			validUsernameLength = true;
			$('.error').hide();
			$('#usernameError').show();
			$('#usernameError').html('Username must be at least 5 characters');
		}
		else if(!$username.match(regex)) {
			validUsernameContent = true;
			$('.error').hide();
			$('#usernameError').show();
			$('#usernameError').html('Username must not contain any special characters');
		}
		else if(!$password1.match($password2)) {
			validpasswordMatch = true;
			$('.error').hide();
			$('#passwordError').show();
			$('#passwordError').html('Your passwords must match');
		}
		else if($password1.length < 5 || $password2.length < 5) {
			validPasswordLength = true;
			$('.error').hide();
			$('#passwordError').show();
			$('#passwordError').html('Your password must be at least 5 characters');
		}
		else if(!$screenName) {
			validScreenNameLength = true;
			$('.error').hide();
			$('#screenNameError').show();
			$('#screenNameError').html('Your Screen Name must not be left empty');
		}
		else if(!$email) {
			validEmailLength = true;
			$('.error').hide();
			$('#emailError').show();
			$('#emailError').html('Your email must not be left empty');
		}
		else {
			$('.error').hide();
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
						r.navigate('loginST', {trigger: true});
					},
					error: (u, error) => {
						console.log('User Not Registered')
					}
				}
			);
		}

	})

	$('.back1').click(function() {
		$('.primeDirectives').show();
		$('.internalData').hide();
	})

	//Chat login events
	$('#loginChatST').click(function() {
		var user = Parse.User.current();
		var avatar = $('#loginAvatar').val()

		if(!($('#loginHandle').val())) {
			$('article').show();
			$('article p').html('Chat Handle cannot be left empty');
			$('.loginStarTrek div').css('opacity', '0.4');
		}
		else {
			Parse.User.logIn(
				$('#loginName').val(),
				$('#loginPassword').val(),
				{
					success: (u) => {

					},
					error: (u, error) => {
						$('article').show();
						$('article p').html('Login credentials invalid, please try again.');
						$('.loginStarTrek div').css('opacity', '0.4');
					}
				}
			);

			setTimeout(function() {
					Parse.User.current().set('avatar', $('#loginAvatar').val());
					Parse.User.current().set('handle', $('#loginHandle').val());
					Parse.User.current().set('tagline', $('#loginTagline').val());
					Parse.User.current().set('handleColor', $('#loginHandleColor').val());
					Parse.User.current().save(null, {
						success: function(user) {
							r.navigate('chatroom', {trigger: true});
							location.reload();
						}
					});
			}, 500);
		}
		
	})

	$('#loginAvatar').click(function() {
		// console.log($('#loginAvatar').val())
		console.log('Select Clicked')
		$('#avvyPic').css('background-image', 'url(' + $('#loginAvatar').val() + ')')
	})

	$('article button').click(function() {
		$('article').hide();
		$('.loginStarTrek div').css('opacity', '1');
	})

	//Chatroom variables and events
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

		var tagline = Parse.User.current().get('tagline');
		if(tagline === undefined) {
			tagline = ''
		}

		var NewMessage = new MessageModel({
			Title: Parse.User.current().get('handle'),
			To: MessageRecipient,
			Message: sendMessage,
			PostDate: time,
			Image: Parse.User.current().get('avatar'),
			Tagline: tagline,
			HandleColor: Parse.User.current().get('handleColor')
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
					// return $bottom.append('<section class="messageBox"><img class="avatar" src="' + message.get('Image') + '"/><div class="messageDetails"><div class="handle" style="color:' + message.get('HandleColor') + '">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="tagline">\'' + message.get('Tagline') + ' \'</div></div><div class="message"><span id="toMessage">' + message.get('To') + '</span> ' + message.get('Message') + '</div></section>')
					return $bottom.append('<p>' + message.get('Message') + '<p>')
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
					// return $bottom.append('<section class="messageBox"><img class="avatar" src="' + message.get('Image') + '"/><div class="messageDetails"><div class="handle" style="color:' + message.get('HandleColor') + '">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="tagline">\'' + message.get('Tagline') + ' \'</div></div><div class="message"><span id="toMessage">' + message.get('To') + '</span> ' + message.get('Message') + '</div></section>')
					return $bottom.append('<p>' + message.get('Message') + '<p>')
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
					// return $bottom.append('<section class="messageBox"><img class="avatar" src="' + message.get('Image') + '"/><div class="messageDetails"><div class="handle" style="color:' + message.get('HandleColor') + '">' + message.get('Title') + '</div><div class="time">at ' + message.get('PostDate').toString().substr(16, 8) + '</div><div class="tagline">\'' + message.get('Tagline') + ' \'</div></div><div class="message"><span id="toMessage">' + message.get('To') + '</span> ' + message.get('Message') + '</div></section>')
					return $bottom.append('<p>' + message.get('Message') + '<p>')
					console.log(message.get('Message'));
				}) 
			}
		})
})