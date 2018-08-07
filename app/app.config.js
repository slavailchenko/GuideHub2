app.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {

        // handle route changes     
    });

});
app.config(['$httpProvider', function($httpProvider) {

	$httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
		return {
			request: function(config) {
				config.headers = config.headers || {};
	
				if (localStorage.getItem('authToken')) {
					config.headers.Authorization = 'Bearer ' + localStorage.getItem('authToken');
				}

				return config;
			},
			responseError: function(response) {
				if (response.status === 401) {
					$location.path('/');
				}

				return $q.reject(response);
			}
		};
	}]);
}]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});