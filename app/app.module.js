var app = angular.module('GuideApp', ['ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps', 'nemLogging', 'ngAnimate', 'ngTouch', 'ngParallax'])
.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true,
            v: '3.17'
        });
    }]
);

