app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
                    .when('/global_map',{
                        templateUrl: 'app/views/map/globalMap.template.html',
                        controller: 'GlobalMap'
                    })
                    .when('/global_map/europe',{
                        templateUrl: 'app/views/map/europMap.template.html',
                        controller: 'Europe' 
                    })
                    .when('/global_map/europe/swiss',{
                        templateUrl: 'app/views/map/country/swissMap.template.html',
                        controller: 'Swiss'
                    })
                    .when('/global_map/europe/swiss/basel',{
                        templateUrl: 'app/views/map/country/swiss/staticArticle.template.html',
                        controller: 'BaselArticle'
                    })
                    .when('/',{
                        templateUrl: 'app/views/homePage.template.html',
                        controller: 'HomePage'
                    })
                    .when('/user-account', {
                    templateUrl: 'app/views/userAccount.template.html',
                    controller: 'UserAccount'
                    })
                .when('/articles-users', {
                    templateUrl: 'app/views/articles-users.template.html',
                    controller: 'ArticlesUsers'
                })
                .when('/articles/:id', {
                    templateUrl: 'app/views/article-details.template.html',
                    controller: 'ArticleDetails'
                })
                .otherwise('/')
})