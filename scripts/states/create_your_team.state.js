var app = require('../app.js');

app.config(function($stateProvider){
	$stateProvider.state('createYourTeam', {
		url: '/create-team',
		templateUrl: '../templates/create_your_team.html'
	})
})