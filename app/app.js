var app = angular.module('app', ['ngRoute', 'ngDialog']);

app.config([
    '$locationProvider', '$routeProvider', '$controllerProvider',
    ($locationProvider, $routeProvider, $controllerProvider) => {
        $locationProvider.hashPrefix('');
        $routeProvider
        .when('/home', {
            templateUrl: 'pages/home/home.html',
        })
        .when('/people', {
            templateUrl: 'pages/people/list.html',
            controller: 'peopleListCtrl'
        })
        .when('/people/:id', {
            templateUrl: 'pages/people/info.html',
            controller: 'userInfoCtrl'
        })
        .when('/films', {
            templateUrl: 'pages/films/list.html',
            controller: 'filmsCtrl'
        })
        .when('/films/:id', {
            templateUrl: 'pages/films/info.html',
            controller: 'filmInfoCtrl'
        })
        .when('/planets', {
            templateUrl: 'pages/planets/list.html',
            controller: 'planetsCtrl'
        })
        .when('/planets/:id', {
            templateUrl: 'pages/planets/info.html',
            controller: 'planetInfoCtrl'
        })
        .when('/species', {
            templateUrl: 'pages/species/list.html',
            controller: 'speciesCtrl'
        })
        .when('/species/:id', {
            templateUrl: 'pages/species/info.html',
            controller: 'specieInfoCtrl'
        })
        .when('/vehicles', {
            templateUrl: 'pages/vehicles/list.html',
            controller: 'vehiclesCtrl'
        })
        .when('/vehicles/:id', {
            templateUrl: 'pages/vehicles/info.html',
            controller: 'vehicleInfoCtrl'
        })
        .when('/starships', {
            templateUrl: 'pages/starships/list.html',
            controller: 'starshipsCtrl'
        })
        .when('/starships/:id', {
            templateUrl: 'pages/starships/info.html',
            controller: 'starshipInfoCtrl'
        })
        .otherwise({redirectTo: '/home'});
        app.controllerProvider = $controllerProvider;
    }
]);