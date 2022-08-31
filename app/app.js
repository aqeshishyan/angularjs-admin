var app = angular.module('app', ['ngRoute', 'usersList']);

app.controller('appCtrl', () => {});

app.config([
    '$locationProvider', '$routeProvider',
    ($locationProvider, $routeProvider) => {
        $locationProvider.hashPrefix('');
        $routeProvider.otherwise({redirectTo: '/people'});
    }
]);