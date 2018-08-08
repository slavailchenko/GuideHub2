(function(){
    'use strict';

    app.controller('ArticleEditor', [
    	'$scope',
        'account.repository', 
        'webApi', 
        '$rootScope', 
        '$location',
        '$uibModal',
        '$uibModalInstance',
    	function($scope, accountRepository, webApi, $rootScope, $location, $uibModal, $uibModalInstance) {
    		$scope.articleName = "Название статьи";
            $scope.articleNameCheck = false;
            console.log($rootScope.sendEditButton);
            $scope.showInput = function() {
                $scope.articleNameCheck = true;
            }

            $scope.hideInput = function(keyEvent) {
                if (keyEvent.which === 13) {
                    $scope.articleNameCheck = false;
                }
            }

            $scope.sendEditedArticle = function() {
                let data = {
                    "user_id": $rootScope.articleData.user_id,
                    "title": $rootScope.articleData.title,
                    "country_travel": $rootScope.articleData.country_travel,
                    "location_travel": $rootScope.articleData.location_travel,
                    "date_travel": $rootScope.articleData.date_travel.toISOString(),
                    "description": $rootScope.articleData.description,
                    "images": $rootScope.articleData.images
                };
                accountRepository.sendEditedArticle($rootScope.articleData.article_id, data).then(function(response) {
                    console.log(response);
                    $uibModalInstance.close(true);
                    accountRepository.getArticles().then(function(response) {
                        $rootScope.writtenArticles = [];
                        for(var i = 0; i < response.data.length; i++) {
                            if (response.data[i].user_id == localStorage.getItem('userId')) {
                                $rootScope.writtenArticles.push(response.data[i]);
                            }
                        }
                    });
                }, function(error) {});
            };

            $scope.sendArticle = function() {
                var input, file, fr, img, result;
                console.log('aaa');
                input = document.getElementById("articlePhoto");
                
                file = input.files[0];
                fr = new FileReader();
                fr.onload = createImage;
                fr.readAsDataURL(file);

                function createImage() {

                    img = new Image();
                    // img = $scope.userPhoto;
                    img.onload = imageLoaded;
                    img.src = fr.result;
                    console.log(fr.result);
                    result = fr.result;

                    let data = {
                        "user_id": $rootScope.articleData.user_id,
                        "title": $rootScope.articleData.title,
                        "country_travel": $rootScope.articleData.country_travel,
                        "location_travel": $rootScope.articleData.location_travel,
                        "date_travel": $rootScope.articleData.date_travel.toISOString(),
                        "description": $rootScope.articleData.description,
                        "images": [result]
                    };

                    var obj = {"photo": result};
                    console.log(data.images);
                    accountRepository.sendArticle(data).then(function(response) {
                        $uibModalInstance.close(true);
                        accountRepository.getArticles().then(function(response) {
                            $rootScope.writtenArticles = [];
                            for(var i = 0; i < response.data.length; i++) {
                                if (response.data[i].user_id == localStorage.getItem('userId')) {
                                    $rootScope.writtenArticles.push(response.data[i]);
                                }
                            }
                        });
                    }, function(error) {});
                    
                }

                function imageLoaded() {
                    var canvas = document.getElementById("canvas")
                    canvas.width = 220;
                    canvas.height = 265;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img,0,0,canvas.width,canvas.height);
                }

                
                
                
            };

            $scope.closeArticleEditor = function() {
                $uibModalInstance.close(true);
                
            };
        }
    ]);
})()