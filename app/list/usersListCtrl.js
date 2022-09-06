'use strict';

var app = angular.module('app');

app.controller('usersListCtrl', ['$scope', '$location', 'apiDataService', 'ngDialog', function ($scope, $location, service, ngDialog) {

  $scope.getPersonInfo = (user) => {
    var id = $scope.getId(user.url);
    $location.path($location.path() + '/' + id);
  }

  $scope.fetchData = (link) => {
    const promise = link ? service.getApiData(link) : service.getApiData(null, 'people');
    promise.then(res => {
      res.results.map((person) => {
        person.homeworld_name = 'loading...';
        service.getApiData(person.homeworld).then(res => {
          person.homeworld_name = res.name;
        })
      })
      $scope.data = res;
    }, err => {
        throw new Error("Error getting data, error message is: ", err)
    });
  }

  $scope.getId = (url) => {
    var arr = url.split('/').filter(e => e);
    return arr[arr.length - 1];
  }

  $scope.openDialog = function(data) {
    ngDialog.open({
      template: '<nw-dialog-data></nw-dialog-data>',
      controller: 'dialogCtrl',
      plain: true,
      className: 'ngdialog-theme-default',
      scope: $scope,
      data: data
    });
  };
}])