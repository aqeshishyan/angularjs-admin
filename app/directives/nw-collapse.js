angular
    .module('app')
    .directive('nwCollapse', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                nwCollapse: '='
            },
            link: function($scope, $elem, $attrs) {
                $scope.collapsed = false;
                $scope.toggle = () => $scope.collapsed = !$scope.collapsed;

                $scope.$watch('nwCollapse', (value) => {
                    var maxLength = 100;

                    if (value && value.length > maxLength) {
                        var firstPart = value.substring(0, maxLength);
                        var secondPart = value.substring(maxLength, value.length);
                        var firstSpan = $compile('<span>' + firstPart + '</span>')($scope);
                        var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')($scope);
                        var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')($scope);
                        var lineBreak = $compile('<br ng-if="collapsed">')($scope);
                        var toggleButton = $compile('<span class="collapse-value-toggle" ng-click="toggle()"><a class="pointer">{{collapsed ? "less" : "more"}}</a></span>')($scope);
      
                        $elem.empty();
                        $elem.append(firstSpan);
                        $elem.append(secondSpan);
                        $elem.append(moreIndicatorSpan);
                        $elem.append(lineBreak);
                        $elem.append(toggleButton);
                    }
                    else {
                        $elem.empty();
                        $elem.append(value);
                    }
                });
            }
        };
      }]);