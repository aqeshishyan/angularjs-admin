'use strict';

var app = angular.module('usersList', ['ngRoute']);

app.config(['$routeProvider', ($routeProvider) => {
  $routeProvider.when('/people', {
    templateUrl: 'list/list.html',
    controller: 'usersListCtrl'
  })
}])

app.controller('usersListCtrl', ['$scope', '$http', function ($scope, $http) {
  const baseURL = 'https://swapi.dev/api/people';

  $scope.goToLink = (link) => {
    $http({
      method: 'GET',
      url: link || baseURL
    }).then(res => {
      if (res && res.status === 200) {
        $scope.data = res.data;
      }
    }, err => {
      // #todo
    })
  }
}])