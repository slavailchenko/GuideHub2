(function(){
    'use strict'
    app.controller('ArticlesUsers', ['$scope', '$rootScope', '$location', 'articles.repository', 'account.repository',
    	function($scope, $rootScope, $location, articlesRepository, accountRepository){
    	
    	$rootScope.path = $location.path();

    	console.log ('articles-users');
		
	articlesRepository.getArticles().then(function(response) {
		$scope.articles = response.data;

		$scope.date_travel = [];
		$scope.mybackground = [[]];
		$scope.background = [];
		var locale = "ru";

		$scope.user = [];
		$scope.likes = [];
		$scope.count_comments = [];

		for (let i=0; i<response.data.length; i++) {
			
			accountRepository.getUserData($scope.articles[i].user_id).then(function(response) {

			$scope.user [i] = response.data.firstname;
					
				}, function(error) {}); 

			articlesRepository.getLikes($scope.articles[i].id).then(function(response) {
			 		
			$scope.likes[i]=response.data.length;
			console.log ($scope.likes[i]);

				}, function(error) {});
		}

		for (let i=0; i<response.data.length; i++) {
			articlesRepository.getCommentsStaticArticles($scope.articles[i].id).then(function(response) {
			 		
			$scope.count_comments[i]=response.data.length;
			console.log ($scope.count_comments[i]);

				}, function(error) {});
		};


		for (let i=0; i<response.data.length; i++) {
			$scope.date_travel[i] = 
			new Date(response.data[i].date_travel).toLocaleString(locale, { month: "short", year: "numeric"});
			console.log ($scope.date_travel[i]);
			$scope.mybackground[i]=JSON.parse(response.data[i].images);
			$scope.background[i] = $scope.mybackground[i].length != 0 ? 
			'url(http://node3.fe.a-level.com.ua/' + $scope.mybackground[i][0] + ') no-repeat':
			'url(../image/users-photos/background.jpg) no-repeat';
			console.log ($scope.mybackground[i]);
			console.log ($scope.background[i]);
	}

	}, function(error) {});


console.log ($scope);


    }])
})()