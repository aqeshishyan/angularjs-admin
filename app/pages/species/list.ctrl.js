'use strict';

var app = angular.module('app');

app.controller('speciesCtrl', ['$scope', 'apiDataService', 'ngDialog', function ($scope, service, ngDialog) {

  $scope.fetchData = (link) => {
    $scope.loading = true;
    const promise = link ? service.getApiData(link) : service.getApiData(null, 'species');
    promise.then(res => {
      $scope.loading = false;
      res.results.map((specie) => {
        if (specie.homeworld) {
          service.getApiData(specie.homeworld).then(res => {
            specie.homeworld_name = res.name;
          })
        } else specie.homeworld_name = '-';        
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