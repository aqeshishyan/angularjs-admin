angular.module('app')
    .component('pager', {
        templateUrl: 'components/pager/pager.html',
        bindings: {
            data: '<',
            fetch: '<'
        }
    });
