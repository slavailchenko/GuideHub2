(function(){
    'use strict';

    app.controller('Header', [
    	'$scope',
    	'$uibModal',
        '$location',
    	function($scope, $uibModal, $location) {
    		$scope.registration = function() { console.log("asdasd");
    			var modal = $uibModal.open({
    				templateUrl: 'app/modal/registration.template.html',
    				controller: 'Registration',
    				size: 'md'
    			});
    		}

            $scope.login = function() {
                var modal = $uibModal.open({
                    templateUrl: 'app/modal/login.template.html',
                    controller: 'Login',
                    size: 'md'
                });
            }

            $scope.logOut = function() {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userId');
                $location.path('');
            }

            $scope.isLogged = function() {
                return localStorage.getItem('authToken') ? true: false;
            }
    }]);
})()