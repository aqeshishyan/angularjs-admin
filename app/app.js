var app = angular.module('app', ['ngRoute', 'ngDialog']);

app.config([
    '$locationProvider', '$routeProvider', '$controllerProvider',
    ($locationProvider, $routeProvider, $controllerProvider) => {
        $locationProvider.hashPrefix('').html5Mode({
            // enabled: true,
            // requireBase: false
        });
        $routeProvider
        .when('/people', {
            templateUrl: 'list/list.html',
            controller: 'usersListCtrl'
        })
        .when('/people/:id', {
            templateUrl: 'userinfo/info.html',
            controller: 'userInfoCtrl'
        })
        .when('/films', {

        })
        .when('/films/:id', {

        })
        .when('/planets', {

        })
        .when('/planets/:id', {

        })
        .when('/species', {

        })
        .when('/species/:id', {

        })
        .when('/vehicles', {

        })
        .when('/vehicles/:id', {

        })
        .otherwise({redirectTo: '/people'});
        app.controllerProvider = $controllerProvider;
    }
]);