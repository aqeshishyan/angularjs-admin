'use strict';

var app = angular.module('app');

app.controller('userListCtrl', ['$scope', '$http', ($scope, $http) => {
  const baseURL = 'https://swapi.dev/api/people';

  $scope.goToLink = (link) => {
    $http({
      method: 'GET',
      url: link || baseURL
    }).then(res => {
      if (res && res.status === 200) {
        $scope.data = res.data;
      }
    }, err => {})
  }
}])