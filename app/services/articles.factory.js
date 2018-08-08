(function() {
	'use strict';
	app.factory('articles.repository', ['webApi', '$http', function(webApi, $http) {
		return {
			getArticles: _getArticles,
			getArticleById: _getArticleById,
			addLikes: _addLikes,
			getLikes: _getLikes,
			addFavorites: _addFavorites,
			// Comment
			getCommentsStaticArticles: _getCommentsStaticArticles,
			addCommentStaticArticle: _addCommentStaticArticle,
			deleteCommentStaticArticle: _deleteCommentStaticArticle,
			editCommentStaticArticle: _editCommentStaticArticle
		};
		
		function _getArticles () {
			return $http.get(webApi.DOMAIN + '/api/v1/articles');
		}
		
		function _getArticleById(articleId) {
			return $http.get(webApi.DOMAIN + '/api/v1/articles/' + articleId);
		}
		function _addLikes(articleId, {user_id: userId}) {
			return $http.post(webApi.DOMAIN + '/api/v1/articles/' + articleId + '/likes', {user_id: userId});
		}
		function _addFavorites(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/favorites', data);
		}
		function _getLikes(articleId) {
			return $http.get(webApi.DOMAIN + '/api/v1/articles/'+articleId+'/likes');
		}
		// Comment
		function _getCommentsStaticArticles(id){
			console.log(id)
			return $http.get(webApi.DOMAIN + '/api/v1/articles/' + id + '/comments');
		};
		function _addCommentStaticArticle(data){
			return $http.post(webApi.DOMAIN + '/api/v1/comments', data)
		};
		function _deleteCommentStaticArticle(id){
			return $http.delete(webApi.DOMAIN + '/api/v1/comments/' + id)
		};
		function _editCommentStaticArticle(id, data){
			return $http.put(webApi.DOMAIN + '/api/v1/comments/' + id, data)
		};
	}]);
})();