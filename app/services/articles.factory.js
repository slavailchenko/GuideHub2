(function() {
'use strict';
app.factory('articles.repository', ['webApi', '$http', function(webApi, $http) {
	return {
		getArticles: _getArticles,
		getArticleById: _getArticleById,
		addLikes: _addLikes,
		getLikes: _getLikes,
		addFavorites: _addFavorites
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

}]);
})();