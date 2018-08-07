(function() {
	'use strict';

	app.factory('account.repository', function(webApi, $http) {
		return {
			login: _login,
			registration: _registration,
			getUserData: _getUserData,
			editUserData: _editUserData,

			sendArticle: _sendArticle,
			sendEditedArticle: _sendEditedArticle,
			getArticles: _getArticles,
			deleteArticle: _deleteArticle,

			addTrip: _addTrip,
			getTrips: _getTrips,
			getFavourites: _getFavourites,
			deleteTrip: _deleteTrip,
		};

		function _registration(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/account/register', data);
		}

		function _login(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/account/login', data);
		}

		function _getUserData(id) {
			return $http.get(webApi.DOMAIN + '/api/v1/users/' + id);
		}

		function _editUserData(id, data) {
			return $http.put(webApi.DOMAIN + '/api/v1/users/' + id, data);
		}

		function _sendArticle(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/articles', data);
		}

		function _sendEditedArticle(id, data) {
			return $http.put(webApi.DOMAIN + '/api/v1/articles/' + id, data);
		}

		function _getArticles() {
			return $http.get(webApi.DOMAIN + '/api/v1/articles');
		}

		function _addTrip(id, data) {
			return $http.post(webApi.DOMAIN + '/api/v1/users/'+id+'/trips', data);
		}

		function _getFavourites(id) {
			return $http.get(webApi.DOMAIN + '/api/v1/users/'+id+'/favorites');
		}

		function _getTrips(id) {
			return $http.get(webApi.DOMAIN + '/api/v1/users/'+id+'/trips');
		}

		function _deleteTrip(userId, tripId) {
			return $http.delete(webApi.DOMAIN + '/api/v1/users/'+userId+'/trips/'+tripId);
		}

		function _deleteArticle(articleId) {
			return $http.delete(webApi.DOMAIN + '/api/v1/articles/' + articleId);
		}


	})
})()