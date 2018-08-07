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
                let data = {
                    "user_id": $rootScope.articleData.user_id,
                    "title": $rootScope.articleData.title,
                    "country_travel": $rootScope.articleData.country_travel,
                    "location_travel": $rootScope.articleData.location_travel,
                    "date_travel": $rootScope.articleData.date_travel.toISOString(),
                    "description": $rootScope.articleData.description,
                    "images": $rootScope.articleData.images
                };
                
                accountRepository.sendArticle(data).then(function(response) {
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

            $scope.closeArticleEditor = function() {
                $uibModalInstance.close(true);
                
            };
        }
    ]);
})()