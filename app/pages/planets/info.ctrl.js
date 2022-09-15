'use strict';

var app = angular.module('app');

app.controller('planetInfoCtrl', ['$scope', 'apiDataService', '$routeParams', function ($scope, service, params) {

    var planetData = $scope.planetData = {
        films: [],
        residents: []
    };

    const init = () => {
        service.getApiData(null, 'planets/' + params.id)
        .then(res => {
            setPlanetData(res);
            $scope.planet = res;
        });
    }

    init ();

    const setPlanetData = (planet) => {
        var data = ['films', 'residents'];
        angular.forEach(data, (elem, inx) => {
            let arr = planet[elem];

            if (arr.length) getNamesPromise(arr).then(res => {
                planetData[elem] = res;
            });
            else planetData[elem] = '-';
        })
    }

    const getNamesPromise = (arr) => {
        return service.getResources(arr)
        .then(res => {
            var names = '';
            angular.forEach(res, elem => {
                var name = elem.data.title ? elem.data.title : elem.data.name;
                if (elem !== res[res.length - 1]) names += name + ', ';
                else names += name;
            })
            return names;
        });
    }
}])