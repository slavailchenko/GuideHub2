(function() {
	'use strict';

	app.controller('Registration', [
		'$scope',
		'account.repository',
		'$uibModalInstance',
		function($scope, accountRepository, $uibModalInstance) {
			$scope.user = {
				login: '',
				email: '',
				password: ''
			};

			$scope.submitRegistration = function() {
				accountRepository.registration($scope.user).then(function(response) {
					console.log('response', response);

					$uibModalInstance.close(true);
				}, function(error) {});
			}
		}]);
})();