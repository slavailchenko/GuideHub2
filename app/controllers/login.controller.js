(function() {
	'use strict';

	app.controller('Login', [
		'$scope',
		'account.repository',
		'$location',
		'$uibModalInstance',
		'$rootScope', 
		'notify',
		function($scope, accountRepository, $location, $uibModalInstance, $rootScope, notify) {
			$scope.user = {
				"login": "",
				"password": ""
			};

			$scope.submitLogin = function() { 
				accountRepository.login($scope.user).then(function(response) {
					console.log(response.data);
					$location.path($location.url() + response.data.id);
					localStorage.setItem('userPassword', response.data.password);
					localStorage.setItem('authToken', response.data.authToken);
					localStorage.setItem('userId', response.data.id);
					localStorage.setItem('userEmail', response.data.email);
					$uibModalInstance.close(true);
					notify({ 
	                    message:'Добро пожаловать', 
	                    classes: "alert succes"
	                });
				}, function(error) {
					notify({ 
	                    message:'Пароль или логин введен неверно!', 
	                    classes: "alert succes"
	                });
				});
			}
		}]);
})();