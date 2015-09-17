'use strict';

$(document).ready(function(){

	var $text = $('#text');
	var $send = $('#send');
	var $clear = $('#clear');
	var $bottom = $('#bottom');
	var $handle = $('#handle');

	var title = $handle.val();
	var sendMessage = $text.val();
	
	$send.click(function() {
		
		var title = $handle.val();
		var sendMessage = $text.val();
		var time = new Date();
		
		$.post(
			'http://tiyfe.herokuapp.com/collections/micko-chat-message/',
			{date: time, name: title, message: sendMessage},
			function(result) {
				// console.log(title, sendMessage);
				// $bottom.append('<div>' + title + ': ' + sendMessage + '</div>');
			},
			'json'
			)

		$text.val('');
	})

	$clear.click(function() {
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
	})


	setInterval(function() {
		$bottom.html('');
		$.get(
			'http://tiyfe.herokuapp.com/collections/micko-chat-message/',
			function(response) {
				for(var i = 0; i < response.length; i++) {
					$bottom.append('<div>' + response[i].date + '<br />' + response[i].name + ': ' + response[i].message + '</div');
				}
			}
		)
	}, 2000);



})