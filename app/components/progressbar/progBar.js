angular.module('app')
    .component('progBar', {
        templateUrl: 'components/progressbar/progBar.html',
        bindings: {
            show: '<'
        }
    });
