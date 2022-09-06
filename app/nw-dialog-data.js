angular.module('app')

.directive('nwDialogData', [() => {
    return {
        restrict: 'E',
        template:
        '<div ng-repeat="item in list">' +
        '   <p>{{item.title || item.name}}</p>' +
        '<div'
    }
}]);
