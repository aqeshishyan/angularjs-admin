var app = angular.module('app', ['ngDialog', 'ui.bootstrap', 'ngRoute' ]);

app.controller('appCtrl', () => {});

app.config([
    'ngDialogProvider', (ngDialogProvider) => {
        ngDialogProvider.setDefaults({
            showClose: false,
        })
    }
]);