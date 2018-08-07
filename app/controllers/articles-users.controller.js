// (function(){
//     'use strict'
//     app.controller('ArticlesUsers', ['$scope',  function($scope){
//     	console.log ('articles-users');
		
// 		$scope.articles = [
// 		{
// 			id: 0,
// 			title: "Header1",
// 			user_id: "User1",
// 			country_travel: 'Швейцария',
// 			location_travel: "loc1-loc2-loc3",
// 			image: "image/noname.png",
// 			annotation: "Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem loremLorem lorem loremLorem lorem lorem Lorem lorem lorem Lorem lorem lorem",
// 			month_travel: "Aug",
// 			year_travel: "2017",
// 			count_likes: 4,
// 			count_comment: 5,
// 		},
// 		{
// 			id: 0,
// 			title: "Header2",
// 			user_id: "User1",
// 			country_travel: 'Швейцария',
// 			location_travel: "loc1-loc2-loc3",
// 			image: "image/noname.png",
// 			annotation: "Lorem lorem lorem",
// 			month_travel: "May",
// 			year_travel: "2017",
// 			count_likes: 2,
// 			count_comment: 3,
// 		},
// 		{
// 			id: 0,
// 			title: "Header3",
// 			user_id: "User2",
// 			country_travel: 'Франция',
// 			location_travel: "loc1-loc2-loc3",
// 			image: "image/noname.png",
// 			annotation: "Lorem lorem lorem",
// 			month_travel: "Sep",
// 			year_travel: "2017",
// 			count_likes: 5,
// 			count_comment: 2,
// 		},
// 		{
// 			id: 0,
// 			title: "Header4",
// 			user_id: "User2",
// 			country_travel: 'Франция',
// 			location_travel: "loc1-loc2-loc3",
// 			image: "image/noname.png",
// 			annotation: "Lorem lorem lorem",
// 			month_travel: "Sep",
// 			year_travel: "2017",
// 			count_likes: 5,
// 			count_comment: 2,
// 		},
// 		{
// 			id: 0,
// 			title: "Header5",
// 			user_id: "User3",
// 			country_travel: 'Германия',
// 			location_travel: "loc1-loc2-loc3",
// 			image: "image/noname.png",
// 			annotation: "Lorem lorem lorem",
// 			month_travel: "Sep",
// 			year_travel: "2017",
// 			count_likes: 5,
// 			count_comment: 2,
// 		}
// 		];

// console.log ($scope);
//     }])
// })()

(function(){
    'use strict'
    app.controller('ArticlesUsers', ['$scope', 'articles.repository', 'account.repository',
    	function($scope, articlesRepository, accountRepository){
    	console.log ('articles-users');
		
	articlesRepository.getArticles().then(function(response) {
		$scope.articles = response.data;

		$scope.date_travel = [];
		$scope.mybackground = [[]];
		$scope.background = [];
		var locale = "ru";

		$scope.user = [];

		for (let i=0; i<response.data.length; i++) {
			
			accountRepository.getUserData($scope.articles[i].user_id).then(function(response) {

			$scope.user [i] = response.data.firstname;
					
		}, function(error) {}); }


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