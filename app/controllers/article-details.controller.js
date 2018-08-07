app.controller('ArticleDetails', ['$scope', '$routeParams', 'articles.repository', 'account.repository',
	function($scope, $routeParams, articlesRepository, accountRepository) {
	var articleId = $routeParams.id,
		articleModel = {};

		$scope.newLike= {
			"article_id": articleId,
            "user_id": localStorage.getItem('userId')
			// "sucess": false,
		};

		console.log ($scope.newLike);

		$scope.autoriz = false;
        if(localStorage.getItem('authToken')){
            $scope.autoriz = true;
        };

		
			 articlesRepository.getLikes(articleId).then(function(response) {
			 		
			 		$scope.likesElemets=response.data;
			 		$scope.likes=response.data.length;
			 		console.log (response.data);
				}, function(error) {});
			

	        function addLike (articleId) {
        	console.log ($scope.autoriz);
           
            if ($scope.autoriz==true) {
            
				    console.log ($scope.likesElemets);
            		console.log ($scope.likes);
                	
                	for (let i=0; i<$scope.likes; i++) {
                		if ($scope.newLike.user_id == $scope.likesElemets[i].user_id) {
                			alert ('Вы уже поставили лайк') 
                               	}
                               	else {

                               		console.log ('else');
                               		articlesRepository.addLikes(articleId)
            						.then(function(response){
            							console.log (response.data);
            							
            							$scope.newLike= {
														"article_id": articleId,
											            "user_id": localStorage.getItem('userId')
														};
            								
										console.log (response.data);
									}, function(error) {});
									}
                               	}
                    		
		      			 }
    			}

    		$scope.addLike = function()	{
           	 	addLike(articleId)
       		 };

    		// console.log ($scope.addLike(articleId));

			
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
