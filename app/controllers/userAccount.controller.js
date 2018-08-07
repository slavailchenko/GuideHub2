(function(){
    'use strict';

    app.controller('UserAccount', [
        '$scope',
        'account.repository', 
        'webApi', 
        '$rootScope', 
        '$location',
        '$uibModal',
        function($scope, accountRepository, webApi, $rootScope, $location, $uibModal){

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


            }, function(error) {});
        }


    	$scope.check = "trip";
        $scope.userNameClick = true;
        
        // User's photo 
        $scope.tempInput = "";
        $scope.aaaa = function() {console.log("aaaaa")}

        $scope.changePhoto = function() {
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

                var obj = {"photo": result};
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
                // alert(canvas.toDataURL("image/png"));
            }

            // function write(msg) {
            //     var p = document.createElement('p');
            //     p.innerHTML = msg;
            //     document.body.appendChild(p);
            // }
            // console.log(result);
            
        };
        // _____________________________

        // User name handlers
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

        // Get  User's Email
        
        accountRepository.getUserData(localStorage.getItem('userId')).then(function(response) {
            $scope.userEmail = response.data.email;
            console.log($scope.userEmail);

        });
        // __________________

        // Change password/Email

        $scope.openChangePass = function() {
            var form = document.getElementById('change-password-form');
            form.style.display = "block";
        };

        $scope.closeChangePass = function() {
            var form = document.getElementById('change-password-form');
            form.style.display = "none";
            $scope.oldPassword = "";
            $scope.newPassword = "";
            $scope.newPassword2 = "";
        };

        $scope.openChangeEmail = function() {
            var form = document.getElementById('change-email-form');
            form.style.display = "block";
        };

        $scope.closeChangeEmail = function() {
            var form = document.getElementById('change-email-form');
            form.style.display = "none";
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
                    alert("Пароль успешно изменен!");
                });
            } else {
                alert("Пароль введен неверно!");
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

        $scope.usersTrips = [];
        accountRepository.getTrips(localStorage.getItem('userId')).then(function(response) {
            for(var i = 0; i < response.data.length; i++) {
                $scope.usersTrips[i] = response.data[i];
            }
            console.log($scope.usersTrips);
        });

        //delete trip button:
        $scope.deleteTrip = function(tripId) {
            accountRepository.deleteTrip(localStorage.getItem('userId'), tripId).then(function(response) {
                console.log(response);
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

        $scope.addTrip = function() {
            if ($scope.savedTrip.articles_ids.length === 0) {
                alert("Вы ничего не добавили в список");
                return;
            }
            accountRepository.addTrip(localStorage.getItem('userId'), $scope.savedTrip).then(function(response) {
                console.log(response.data);
            });
        }

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
            $rootScope.sendEditButton = false;
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
                console.log(response);
            });
        };

        $scope.openArticleEditor = function() {
            var modal = $uibModal.open({
                templateUrl: 'app/modal/articleEditor.template.html',
                controller: 'ArticleEditor',
                size: 'lg',
                backdrop: false
            });
        }


    }]);

})()