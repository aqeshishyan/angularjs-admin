'use strict';

var app = angular.module('app');

app.controller('planetsCtrl', ['$scope', 'apiDataService', 'ngDialog', function ($scope, service, ngDialog) {

  $scope.fetchData = (link) => {
    $scope.loading = true;
    const promise = link ? service.getApiData(link) : service.getApiData(null, 'planets');
    promise.then(res => {
      $scope.data = res;
      $scope.loading = false;
    }, err => {
        throw new Error("Error getting data, error message is: ", err)
    });
  }

  $scope.getId = (url) => {
    var arr = url.split('/').filter(e => e);
    return arr[arr.length - 1];
  }

  $scope.openDialog = (data, title) => {
    ngDialog.open({
      template: '<nw-dialog></nw-dialog>',
      plain: true,
      className: 'ngdialog-theme-default',
      scope: $scope,
      data: {
        data: data,
        title: title
      }
    });
  };
}])