(function(){
    'use strict'
    app.controller('GlobalMap', [ '$scope', '$location','$rootScope', function($scope, $location, $rootScope){
        $rootScope.path = $location.path();
        $scope.continent = {
            southAmerica: 'southAmerica',
            northAmerica: 'northAmerica',
            africa: 'africa',
            europa: 'europa',
            asia: 'asia',
            australia: 'australia'
        }
        $scope.showEurop = function(){
            $scope.continent = {
                southAmerica: 'southAmerica_cl',
                northAmerica: 'northAmerica_cl',
                africa: 'africa_cl',
                europa: 'europa_cl',
                asia: 'asia_cl',
                australia: 'australia_cl'
            }
            setTimeout(function(){         
                $scope.$apply($location.path($location.url() + '/europe'))
            }, 2000)
        }
        $scope.hover = function(continent){
            $scope.showDetails = true;
            let detail = {
                southAmerica: 'Южная Америка',
                northAmerica: 'Северная Америка',
                africa: 'Африка',
                europa: 'Европа',
                asia: 'Азия',
                australia: 'Австралия'
            }
            $scope.detail = detail[continent]
        }
        $scope.hoverOut = function(){
            $scope.showDetails = false;
        }
    }])
})()