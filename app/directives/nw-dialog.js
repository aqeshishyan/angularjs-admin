angular.module('app')

.directive('nwDialog', ['apiDataService', '$rootScope', (service, $rootScope) => {
    return {
        restrict: 'E',
        template:
            '<div>' +
            '   <div class="modal-header">' +
            '       <h3>' +
            '           {{title}}' +
            '       </h3>' +
            '   </div>' +
            '   <prog-bar show="loading"></prog-bar>' +
            '   <hr ng-if="!loading"/>' +
            '   <div ng-repeat="item in list">' +
            '       <a href="#{{getUrlPath(item.data)}}">{{item.data.title || item.data.name}}</a>' +
            '   </div>' +
            '</div>',
        link: ($scope, $elem, $attrs) => {
            var dialogData = $scope.ngDialogData;
            $scope.title = dialogData.title;

            $scope.loading = true;
            service.getResources(dialogData.data)
            .then(res => {
                $scope.list = res;
                $scope.loading = false;
            })

            $scope.getUrlPath = (data) => {
                var arr = data.url.split('/').filter(e => e);
                return arr[arr.length - 2] + '/' + arr[arr.length - 1];
            }

            $rootScope.$on('$routeChangeStart', () => $scope.closeThisDialog())
        }
    }
}]);
