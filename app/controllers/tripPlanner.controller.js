(function(){
    'use strict';

    app.controller('TripPlanner', [
    	'$scope',
        'account.repository', 
        'webApi', 
        '$rootScope', 
        '$location',
        '$uibModal',
        '$uibModalInstance',
    	function($scope, accountRepository, webApi, $rootScope, $location, $uibModal, $uibModalInstance) {

            $scope.tripNameClick = true;

            $scope.tripNameClickHandler_1 = function() {
                $scope.tripNameClick = false;
            };

            $scope.tripNameClickHandler_2 = function(keyEvent) {
                if (keyEvent.which === 13) {
                    $scope.tripNameClick = true;
                    console.log($scope.tripName);
                }
            };

            setTimeout(function() {
                var list1 = document.getElementById('plane-trip-list1');
                var sortableList1 = Sortable.create(list1, {
                    group: 'plane-trip-group',
                    animation: 300,
                    onAdd: function (evt) {
                        $scope.sortedPlaceList.push($scope.unsortedPlacesList[evt.item.getAttribute("data-index")]);
                        $scope.articles_ids.push($scope.unsortedPlacesList[evt.item.getAttribute("data-index")][0].id);
                        $scope.$apply();
                        console.log($scope.sortedPlaceList);
                    },
                    onRemove: function (evt) {
                        console.log(evt);
                        $scope.sortedPlaceList.splice(evt.oldIndex, 1);
                        $scope.$apply();
                    },
                });

                var list2 = document.getElementById('plane-trip-list2');
                var sortableList2 = Sortable.create(list2, {
                    group: 'plane-trip-group',
                    animation: 300
                });
            }, 1000);

            $scope.tripName = "Названиe";
            $scope.articles_ids = [];

            $scope.unsortedPlacesList = [];
            accountRepository.getFavourites(localStorage.getItem('userId')).then(function(response) {
                for(var i = 0; i < response.data.length; i++) {
                    $scope.unsortedPlacesList[i] = [];
                    $scope.unsortedPlacesList[i][0] = {
                        id: response.data[i].id,
                        latitude: response.data[i].location.split(';')[0],
                        longitude: response.data[i].location.split(';')[1],
                        title: response.data[i].title
                    };
                }
            });

            $scope.addTrip = function() {
                var savedTrip = {
                    title: $scope.tripName,
                    articles_ids: $scope.articles_ids
                };
                if (savedTrip.articles_ids.length === 0) {
                    alert("Вы ничего не добавили в список");
                    return;
                }

                accountRepository.addTrip(localStorage.getItem('userId'), savedTrip).then(function(response) {
                    console.log(response.data);
                });
                $uibModalInstance.close(true);
            }

            $scope.closeTripPlanner = function() {
                $uibModalInstance.close(true);
            };

            $scope.sortedPlaceList = [
                
            ];


            // google maps
            $scope.map = { 
                center: { 
                    latitude: 47, 
                    longitude: 9
                }, 
                zoom: 8
            };

            $scope.bd = {
                northeast: {
                    latitude: 51.219053,
                    longitude: 4.404418
                },
                southwest: {
                    latitude: -51.219053,
                    longitude: -4.404418
                }
            };

            $scope.markers = [
                [{
                    id: 4,
                    latitude: 46.3, 
                    longitude: 9.2,
                    placeName: "dddd"
                }],
                [{
                    id: 5,
                    latitude: 46.1, 
                    longitude: 8.8,
                    placeName: "eeee"
                }]
            ];

            $scope.options = {
                scrollwheel: true
            };
    		
        }
    ]);
})()