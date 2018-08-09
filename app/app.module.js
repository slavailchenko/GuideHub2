
var app = angular.module('GuideApp', ['ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps', 'nemLogging', 'ngAnimate', 'ngTouch', 'ngParallax','cgNotify'])
.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true,
            v: '3.17'
        });
    }]
)
.controller('controller1', function($scope) {
	$scope.userImage = 'http://www.bureauofsillyideas.com/wp-content/themes/fortunato-pro/images/no-image-box.png';
	
	$scope.uploadImage = function() {
		console.log($scope.userImage);
	};
})
.controller('controller2', function($scope) {
	$scope.userImage = 'http://www.bureauofsillyideas.com/wp-content/themes/fortunato-pro/images/no-image-box.png';
	
	$scope.triggerFile = function(id) {
		document.getElementById(id).click();
	};
})
.controller('controller3', function($scope) {
	$scope.userImage = 'http://www.bureauofsillyideas.com/wp-content/themes/fortunato-pro/images/no-image-box.png';
	
	$scope.triggerFile = function(id) {
		document.getElementById(id).click();
	};
	
	$scope.$watch('userImage', function(newValue, oldValue) {
		if (newValue !== oldValue) {
			$scope.uploadImage(newValue);
		}
	});
	
	$scope.uploadImage = function() {
		$scope.array = [];
		$scope.array.push($scope.userImage);
		console.log($scope.array);
	};
})
.directive('base64', [function () {
    return {
        scope: {
            base64: '='
        },
        link: function (scope, element, attributes) {
            element.bind('change', function(event) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    scope.$apply(function() {
                        scope.base64 = event.target.result;
                    });
                }
                reader.readAsDataURL(event.target.files[0]);
            });
        }
    }
}])
.directive('fileModel', ['$parse', function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
		  var model = $parse(attrs.fileModel);
		  var modelSetter = model.assign;
		  element.bind('change', function() {
			 scope.$apply(function() {
				var reader = new FileReader();
                reader.onload = function(event) {
                    scope.$apply(function() {
						modelSetter(scope, event.target.result);
                    });
                }
				
                reader.readAsDataURL(event.target.files[0]);
			 });
		  });
	   }
	};
 }]);

