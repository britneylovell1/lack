var app = require('../app.js');
// do we need to require createTeamCtrl?

app.config(function($stateProvider, createTeamCtrl){
	$stateProvider.state('createYourTeam', {
		url: '/create-team',
		templateUrl: '../templates/create_your_team.html',
		controller: 'createTeamCtrl'
	})
});