(function(){
    'use strict';
    
    // app.directive('base64',  [function () {
    //     return {
    //         scope: {
    //             base64: "="
    //         },
    //         link: function (scope, element, attributes) {
    //             element.bind('change', function (changeEvent) {
    //                 var reader = new FileReader();
    //                 reader.onload = function (event) {
    //                     scope.$apply(function() {
    //                         scope.base64 = event.target.result;
    //                     });
    //                 }
    //                 reader.readAsDataURL(changeEvent.target.files[0]);
    //                 console.log(scope.base64);
    //                 // photoPhoto = scope.base64;
    //             });
    //         }
    //     }
    // }]);

    app.controller('UserAccount', [
        '$scope',
        'account.repository', 
        'webApi', 
        '$rootScope', 
        '$location',
        '$uibModal',
        'notify',
        function($scope, accountRepository, webApi, $rootScope, $location, $uibModal, notify){

        $rootScope.path = $location.path();

        if (localStorage.getItem("userId")) {
            accountRepository.getUserData(localStorage.getItem("userId")).then(function(response) {
                // console.log(response.data.photo);
                if (response.data.firstname) {
                    $scope.userName = response.data.firstname;
                } else {
                    $scope.userName = "Введите ваше имя";
                }

                if (response.data.photo) {
                    $scope.userPhoto = webApi.DOMAIN + "/" + response.data.photo;
                } else {
                    $scope.userPhoto = "./image/unknown.png";
                }

                if (response.data.email) {
                    $scope.userEmail = response.data.email;
                } else {
                    $scope.userEmail = "Введите ваш Email";
                }


            }, function(error) {});
        }


    	// $scope.check = "trip";
        
        
        
        // User's photo 
        $scope.tempInput = "";

        $scope.changePhoto = function() {console.log("sdsd");
            var input, file, fr, img, result;
            console.log('aaa');
            input = document.getElementById("userPhoto");
            
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createImage;
            fr.readAsDataURL(file);

            function createImage() {

                img = new Image();
                // img = $scope.userPhoto;
                img.onload = imageLoaded;
                img.src = fr.result;
                console.log(fr.result);
                result = fr.result;

                var obj = {"photo": scope.base64};
                accountRepository.editUserData(localStorage.getItem("userId"), obj).then(function(response) {
                    console.log(response);
                }, function(error) {});
            }

            function imageLoaded() {
                var canvas = document.getElementById("canvas")
                canvas.width = 220;
                canvas.height = 265;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img,0,0,canvas.width,canvas.height);
            }
            
        };

        $scope.triggerFile = function(id) {
            document.getElementById(id).click();
        };
        // _____________________________

        // User name handlers
        $scope.userNameClick = true;

        $scope.userNameClickHandler_1 = function() {
            $scope.userNameClick = false;
        };

        $scope.userNameClickHandler_2 = function(keyEvent) {
            if (keyEvent.which === 13) {
                $scope.userNameClick = true;

                let userId = localStorage.getItem("userId");
                let obj = {
                    "firstname" : $scope.userName                    
                };
                accountRepository.editUserData(userId, obj).then(function(response) {
                    console.log(response);
                }, function(error) {});
            }
        };
        // __________________

        // User Email handlers
        $scope.userEmailClick = true;

        $scope.userEmailClickHandler_1 = function() {
            $scope.userEmailClick = false;
        };

        $scope.userEmailClickHandler_2 = function(keyEvent) {
            if (keyEvent.which === 13) {
                $scope.userEmailClick = true;

                let userId = localStorage.getItem("userId");
                let obj = {
                    "email" : $scope.userEmail                  
                };
                accountRepository.editUserData(userId, obj).then(function(response) {
                    console.log(response)
                    // accountRepository.getUserData(localStorage.getItem("userId")).then(function(response) {}, function(error) {})
                }, function(error) {});
            }
        };
        // __________________

        // Get  User's Email
        
        accountRepository.getUserData(localStorage.getItem('userId')).then(function(response) {
            $scope.userEmail = response.data.email;
            console.log($scope.userEmail);

        });
        // __________________

        // Change password/Email
        $scope.checkOpenChangePass = false;
        $scope.openChangePass = function() {
            var form = document.getElementById('change-password-form');
            if ($scope.checkOpenChangePass === false ) {
                form.style.display = "block";
                $scope.checkOpenChangePass = true;
            } else {
                form.style.display = "none";
                $scope.oldPassword = "";
                $scope.newPassword = "";
                $scope.newPassword2 = "";
                $scope.checkOpenChangePass = false;
            }
            
        };

        $scope.closeChangePass = function() {
            var form = document.getElementById('change-password-form');
            form.style.display = "none";
            $scope.oldPassword = "";
            $scope.newPassword = "";
            $scope.newPassword2 = "";
            $scope.checkOpenChangePass = false;
        };

        
        $scope.oldPassword = "";
        var oldPasswordConfirm = false;

        $scope.newPassword = "";
        $scope.newPassword2 = "";
        var newPasswordConfirm = false;

        $scope.checkOldPassword = function() {
            console.log($scope.oldPassword);
            if ($scope.oldPassword !== localStorage.getItem('userPassword')) {
                document.getElementById('oldPassword').style.border = "1px solid red";
            } else {
                document.getElementById('oldPassword').style.border = "1px solid green";
                oldPasswordConfirm = true;
            }
        };

        $scope.checkNewPassword = function() {
            if ($scope.newPassword !== $scope.newPassword2 || $scope.newPassword === "" && $scope.newPassword2 === "") {
                document.getElementById('newPassword').style.border = "1px solid red";
                document.getElementById('newPassword2').style.border = "1px solid red";
            } else {
                document.getElementById('newPassword').style.border = "2px solid green";
                document.getElementById('newPassword2').style.border = "2px solid green";
                newPasswordConfirm = true;
            }
        };

        $scope.changePassword = function() {
            if (newPasswordConfirm && oldPasswordConfirm) {
                var data = {
                    password: $scope.newPassword2
                };
                accountRepository.editUserData(localStorage.getItem('userId'), data).then(function(response) {
                   
                  notify({ 
                    message:'Пароль успешно изменен', 
                    classes: "alert succes"
                  });
                });
            } else {
                notify({ 
                    message:'Пароль введен неверно', 
                    classes: "alert danger"
                  });
            }
        };


        $scope.changeEmail = function() {
         console.log($scope.userEmail);
            var data = {email: $scope.userEmail};
            accountRepository.editUserData(localStorage.getItem('userId'), data).then(function(response) {
               console.log(response);
            });
        };




        // _____________________________

        
        //        TRIPS

        $scope.tripNameClick = true;

        $scope.tripNameClickHandler_1 = function() {
            $scope.tripNameClick = false;
        };

        $scope.tripNameClickHandler_2 = function(keyEvent) {
            if (keyEvent.which === 13) {
                $scope.tripNameClick = true;
            }
        };

        $scope.openTripPlanner = function() {
            var modal = $uibModal.open({
                    templateUrl: 'app/modal/tripPlanner.template.html',
                    controller: 'TripPlanner',
                    size: 'lg'
                });
        }

        $rootScope.usersTrips = [];

        accountRepository.getTrips(localStorage.getItem('userId')).then(function(response) {
            for(var i = 0; i < response.data.length; i++) {
                $rootScope.usersTrips[i] = response.data[i];
            }
            console.log("список поездок", $rootScope.usersTrips);
        });

        //delete trip button:
        $scope.deleteTrip = function(tripId) {
            accountRepository.deleteTrip(localStorage.getItem('userId'), tripId).then(function(response) {
                
                accountRepository.getTrips(localStorage.getItem('userId')).then(function(response) {
                    $rootScope.usersTrips = [];
                    for(var i = 0; i < response.data.length; i++) {
                        $rootScope.usersTrips[i] = response.data[i];                        
                    }                    
                });
            });
        };

        
        $scope.tripName = "Название";
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

        $scope.savedTrip = {
            title: $scope.tripName,
            articles_ids: $scope.articles_ids
        };

        // $scope.addTrip = function() {
        //     if ($scope.savedTrip.articles_ids.length === 0) {
        //         alert("Вы ничего не добавили в список");
        //         return;
        //     }
        //     accountRepository.addTrip(localStorage.getItem('userId'), $scope.savedTrip).then(function(response) {
                
        //     });
        // }

        $scope.sortedPlaceList = [];

        $scope.showMarkers = function(trip) {
            $scope.sortedPlaceList = [];
            for(var i = 0; i < trip.places.length; i++) {
                $scope.sortedPlaceList[i] = [{
                    id: trip.places[i].id, 
                    latitude: trip.places[i].location.split(';')[0], 
                    longitude: trip.places[i].location.split(';')[1],
                    title: trip.places[i].title
                }]; 
            }
            console.log($scope.sortedPlaceList);
        };

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
        // ________________________________
        

        // Users Articles

        // Получение списка статей 
        accountRepository.getArticles().then(function(response) {
            $rootScope.writtenArticles = [];
            for(var i = 0; i < response.data.length; i++) {
                if (response.data[i].user_id == localStorage.getItem('userId')) {
                    $rootScope.writtenArticles.push(response.data[i]);
                }
            }

            console.log($rootScope.writtenArticles)
        });

        $rootScope.articleData = {
            "user_id": localStorage.getItem("userId"),
            "title": "",
            "country_travel": "",
            "location_travel": "",
            "date_travel": "",
            "description": "",
            "images": [],
            "article_id": ""
        };

        //Редактировать статью по клику на ней
        $scope.editArticle = function(article) {
            $rootScope.sendEditButton = true;
            $rootScope.articleData.title = article.title;
            $rootScope.articleData.country_travel = article.country_travel;
            $rootScope.articleData.location_travel = article.location_travel;
            $rootScope.articleData.date_travel = new Date(article.date_travel.toString());
            $rootScope.articleData.description = article.description;
            $rootScope.articleData.article_id = article.id;
            var modal = $uibModal.open({
                templateUrl: 'app/modal/articleEditor.template.html',
                controller: 'ArticleEditor',
                size: 'lg',
                backdrop: false
            });
        };

        $scope.deleteArticle = function(article) {
            console.log(article);
            accountRepository.deleteArticle(article.id).then(function(response) {
                accountRepository.getArticles().then(function(response) {
                    $rootScope.writtenArticles = [];
                    for(var i = 0; i < response.data.length; i++) {
                        if (response.data[i].user_id == localStorage.getItem('userId')) {
                            $rootScope.writtenArticles.push(response.data[i]);
                        }
                    }
                });
            });
        };

        $scope.openArticleEditor = function() {
            $rootScope.sendEditButton = false;
            $rootScope.articleData.title = "Название статьи";
            $rootScope.articleData.country_travel = "";
            $rootScope.articleData.location_travel = "";
            $rootScope.articleData.date_travel = "";
            $rootScope.articleData.description = "";
            $rootScope.articleData.article_id = "";
            $rootScope.articleData.images = [];
            var modal = $uibModal.open({
                templateUrl: 'app/modal/articleEditor.template.html',
                controller: 'ArticleEditor',
                size: 'lg',
                backdrop: false
            });
        }


    }]);

})()