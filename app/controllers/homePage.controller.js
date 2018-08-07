(function(){
    'use strict';

    app.controller('HomePage', [
    	'$scope',
        '$location',
        '$rootScope',
    	function($scope, $location, $rootScope) {
            $rootScope.path = $location.path();
    		console.log($rootScope.path);
        }
    ]);
})()