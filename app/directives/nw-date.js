angular.module('app')

.directive('nwDate', [() => {
    return {
        restrict: 'A',
        scope: {
            nwDate: '='
        },
        link: ($scope, $elem, $attrs) => {
            $scope.$watch('nwDate', (newVal) => {
                if (newVal) {
                    let isoDate = new Date(newVal),
                        year = isoDate.getFullYear(),
                        month = isoDate.getMonth() + 1,
                        day = isoDate.getDate(),
                        date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
                    $elem.text(date);
                }
            })            
        }
    }
}])
