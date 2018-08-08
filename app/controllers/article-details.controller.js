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


	// 					COMMENT
	$scope.newComment = {
		"article_id": $routeParams.id,
		"user_id": 0,
		"rate": 0,
		"content": "",
		"static": false
	}
	$scope.editObj = {
		rate: '',
		content: ''
	}
	$scope.path = $rootScope.path;
	$scope.autoraisMod = false;
	if(localStorage.getItem('authToken')){
		$scope.autoraisMod = true;
	};

	// SERVICE FUNCTION

	function accesforUser(data, id, flag, mod){
		for (let i = 0; i < data.length; i++) {
			if(data[i].user.id === id){
				data[i][mod] = flag;
			}
			for (let j = 0; j < data[i].nested.length; j++) {
				if(data[i].nested[j].user.id === id){
					data[i].nested[j][mod] = flag;
				};
				for (let x = 0; x < data[i].nested[j].nested.length; x++){
					if(data[i].nested[j].nested[x].user.id === id){
						data[i].nested[j].nested[x][mod] = flag;
					};
				}  
			}
			
		}
		
		return data
	}
	function editMod(data, id, flag, mod){
		for (let i = 0; i < data.length; i++) {
			if(data[i].id === id){
				data[i][mod] = flag;
			}
			for (let j = 0; j < data[i].nested.length; j++) {
				if(data[i].nested[j].id === id){
					data[i].nested[j][mod] = flag;
				};
				for (let x = 0; x < data[i].nested[j].nested.length; x++){
					if(data[i].nested[j].nested[x].id === id){
						data[i].nested[j].nested[x][mod] = flag;
					};
				}   
			}
			
		}
		
		return data
	}
	function showCommentForId(data, id, flag, mod){
		for (let i = 0; i < data.length; i++) {
			if(data[i].id === id){
				data[i][mod] = flag;
				for (let j = 0; j < data[i].nested.length; j++) {
					data[i].nested[j][mod] = flag;
					for (let x = 0; x < data[i].nested[j].nested.length; x++){
						data[i].nested[j].nested[x][mod] = flag;
					}   
				}
			}else if(data[i].id !== id){
				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < data[i].nested.length; j++) {
						if(data[i].id === id){
						data[i].nested[j][mod] = flag;
						}
						for (let x = 0; x < data[i].nested[j].nested.length; x++){
							data[i].nested[j].nested[x][mod] = flag;
						}   
					}
				
				}
			}
			}
			return data  
		}
	function showComment(data, flag, mod){
		for (let i = 0; i < data.length; i++) {
			data[i][mod] = flag;
			for (let j = 0; j < data[i].nested.length; j++) {
				data[i].nested[j][mod] = flag;
				for (let x = 0; x < data[i].nested[j].nested.length; x++){
					data[i].nested[j].nested[x][mod] = flag;
				}   
			}
			
		}
		
		return data
	}

	function debugCommentMod(data){
		
		for (let i = 0; i < data.length; i++) {
			data[i].commentMod = false;
			for (let j = 0; j < data[i].nested.length; j++) {
				data[i].nested[j].commentMod = false;
				for (let x = 0; x < data[i].nested[j].length; x++){
						data[i].nested[j].nested[x].commentMod = false;
				}    
			}
		}
		return data
	};
	function commentMod(data, id, flag){
		data.map(function(item){
			if(item.id === id){
				item.commentMod = flag;
			}
			for (let x = 0; x < item.nested.length; x++){
				item.nested[x].commentMod = flag;
				for (let j = 0; j < item.nested[x].length; j++){
					item.nested[x].nested[j].commentMod = flag;
				}
			}   
		})
	}
	var locatiPath =  $routeParams.id;
	console.log(locatiPath)
	function getComment(){
		console.log('Ok')
		articlesRepository.getCommentsStaticArticles(locatiPath).then(function(response){
			console.log(response.data)
			let commentMod = debugCommentMod(response.data);
			let userId = +localStorage.getItem('userId');
			let access = accesforUser(commentMod, userId, true, 'access');
			let comments = showComment(access, false, 'showComment');
			console.log(comments)
			$scope.comments = comments.slice().reverse();
		}) 
	}

	
	function addComment(parentId){
		let userId = localStorage.getItem('userId');
		$scope.newComment.user_id = userId;
		$scope.newComment.parent_id = parentId;
		articlesRepository.addCommentStaticArticle($scope.newComment)
		.then(function(response){
			getComment()
			$scope.newComment = {
				"article_id": $routeParams.id,
				"user_id": 0,
				"rate": 0,
				"content": "",
				"static": false
			}
		})
	}

	// MAIN


	articlesRepository.getCommentsStaticArticles(locatiPath).then(function(response){
            let commentMod = debugCommentMod(response.data);
            let userId = +localStorage.getItem('userId');
            let access = accesforUser(commentMod, userId, true, 'access');
            let comments = showComment(access, false, 'showComment');
        	console.log(comments)
            $scope.comments = comments.slice().reverse();
	}) 
	
	// ADD & DELETE

	$scope.addComment = function(){
		addComment(0)
	}
	$scope.deleteComment = function(id){
		articlesRepository.deleteCommentStaticArticle(id)
		.then(function(response){
			getComment($routeParams.id)
		})
	}
	// COMMENT COMMENT


	$scope.cancelCommentComment = function(id){
		commentMod($scope.comments, id, false)
	}
	$scope.addCommentComment = function(id){
		commentMod($scope.comments, id, false)
		addComment(id);
	}
	$scope.commentComment = function(id){
		commentMod($scope.comments, id, true)    
	}
	// EDIT

	$scope.editComment = function(id, content){
		$scope.editObj.content = content;
		var comments = editMod($scope.comments , id, true, 'editMod');
		$scope.comments = comments;
	};
	$scope.cancelEditComment = function(id){
		$scope.editObj.content = '';
		var comments = editMod($scope.comments , id, false, 'editMod');
		$scope.comments = comments;
	};
	$scope.addEditComment = function(id, rate){
		$scope.editObj.rate = rate
		console.log(id)
		articlesRepository.editCommentStaticArticle(id, $scope.editObj).then(function(response){ 
			console.log(response)
			getComment($routeParams.id)
			$scope.editObj = {
				rate: '',
				content: ''
			}
		})
	};
	$scope.showComment = function(id){
		$scope.comments = showCommentForId($scope.comments, id, true , 'showComment');
	}
	$scope.hidenComment = function(id){
		$scope.comments = showCommentForId($scope.comments, id, false , 'showComment'); 
		console.log(id);
		console.log($scope.comments);
	}
}]);
