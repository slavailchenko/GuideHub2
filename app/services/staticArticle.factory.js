(function() {
	'use strict';

	app.factory('staticArticle.repository', function(webApi, $http) {
		return {
			getStaticArticles: _getStaticArticles,
			getCommentsStaticArticles: _getCommentsStaticArticles,
			addCommentStaticArticle: _addCommentStaticArticle,
			deleteCommentStaticArticle: _deleteCommentStaticArticle,
			editCommentStaticArticle: _editCommentStaticArticle
		};
        function _getStaticArticles(city){
			return $http.get(webApi.DOMAIN + '/api/v1/static_articles/basel' );
		};
		function _getCommentsStaticArticles(data){
			return $http.get(webApi.DOMAIN + '/api/v1/articles/' + 1 + '/comments?static=true');
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
	})
})()