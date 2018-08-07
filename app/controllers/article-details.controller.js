app.controller('ArticleDetails', ['$scope', '$rootScope', '$routeParams', 'webApi', '$location', 'articles.repository', 'account.repository',
	function($scope, $rootScope, $routeParams, webApi, $location, articlesRepository, accountRepository) {
	$rootScope.path = $location.path();

	var articleId = $routeParams.id,
		articleModel = {};

		$scope.newLike= {
			"article_id": articleId,
            "user_id": localStorage.getItem('userId')
		
		};

		console.log ($scope.newLike);

		
			articlesRepository.getLikes(articleId).then(function(response) {
			 		
			 		$scope.likesElemets=response.data;
			 		$scope.likes=response.data.length;
			 		console.log (response);
				}, function(error) {});

			accountRepository.getFavourites(localStorage.getItem('userId')).then(function(response) {
			 		
			 		$scope.favorites=response.data;
			 		
			 		console.log ($scope.favorites);

				}, function(error) {});


		// фукция добавления статьи в избранное

		   $scope.addFavorites = function  () {

		   if (localStorage.getItem('userId')) {
            
			for (let i=0; i<$scope.favorites.length; i++) {
           		if ($routeParams.id == $scope.favorites[i].id) {
                 			alert ('Данная статья уже в избранном');
                 			return;
                              	} 
                           }; 
                             	
 			
		   		articlesRepository.addFavorites($scope.newLike)
		   		.then(function (response) {
		   			
		   			console.log (response);


		   		}, function(error) {});
		   }
		}

 		// функция добавления лайка

	       $scope.addLike = function  () {
        	
           		if (localStorage.getItem('userId')) {
            
				    console.log ($scope.likesElemets);
            		
                	for (let i=0; i<$scope.likes; i++) {
                		if (localStorage.getItem('userId') == $scope.likesElemets[i].user_id) {
                			alert ('Вы уже поставили лайк');
                			return;
                               	} 
                               }; 
                               	
                               		let userId = localStorage.getItem('userId'),
                               		articleId = $routeParams.id;
                               		console.log ('else', userId, articleId);
                               		
                               		articlesRepository.addLikes(articleId, {user_id: userId}).then(function(response){
            		           			console.log (response.data);

            								alert ('Вы добавили лайк');
            								$scope.newLike= {
														"article_id": articleId,
											            "user_id": localStorage.getItem('userId')
														};
            																		
										
									}, function(error) {});
									
                               	
                    		
		      			 }
    			}

		
	 articlesRepository.getArticleById(articleId).then(function(response) {
			$scope.article =response.data;
			console.log ($scope.article);
		
		accountRepository.getUserData($scope.article.user_id).then(function(response) {

			$scope.user = response.data;
			$scope.photo = response.data.photo ? 'http://node3.fe.a-level.com.ua/'+response.data.photo : 'image/user.png';

		}, function(error) {});
	
		$scope.slides = [{'image': $scope.article.images[0]},
	        {'image': $scope.article.images[1]},
	        {'image': $scope.article.images[2]},
	        {'image': $scope.article.images[3]},
	       ];
			
	    console.log ($scope.slides);

		$scope.current = 0;

		$scope.isActive = function(index) {
			return $scope.current === index;
		};
		
		$scope.prevSlide = function() {
			$scope.current = $scope.current > 0
				? --$scope.current
			: $scope.slides.length - 1;
		};

		$scope.nextSlide = function() {
			$scope.current = $scope.current < $scope.slides.length - 1
				? ++$scope.current
			: 0;
		};
		
		$scope.showSlide = function(index) {
			$scope.current = index;
		};
		
	}, function(error) {});

		
 	console.log ($scope);

	// $scope.delay = 4000; 
	// $scope.slides = [
	//         { 'image': 'image/users-photos/0001.jpg'},
	//         { 'image': 'image/users-photos/0002.jpg' },
	//         { 'image': 'image/users-photos/0003.jpg' },
	//         { 'image': 'image/users-photos/0004.jpg' }
	//        ];


}]);

// https://github.com/esvit/bz-slider/blob/master/examples/demo1.html
// https://codepen.io/monochromer/pen/jEeRVK/
