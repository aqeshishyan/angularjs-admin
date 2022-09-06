angular.module('app')

.controller('dialogCtrl', ['$scope', 'apiDataService', '$q', ($scope, service, $q) => {
    var data = $scope.ngDialogData;
    $q.all(data.map(item => {
        return service.getApiData(item)
    }))
    .then(res => {
        $scope.list = res;
    })
}])
