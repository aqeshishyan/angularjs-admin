'use strict';

var app = angular.module('app');

app.controller('vehicleInfoCtrl', ['$scope', 'apiDataService', '$routeParams', function ($scope, service, params) {

    var vehicleData = $scope.vehicleData = {
        films: [],
        pilots: []
    };

    const init = () => {
        service.getApiData(null, 'vehicles/' + params.id)
        .then(res => {
            setVehicleData(res);
            $scope.vehicle = res;
        });
    }

    init ();

    const setVehicleData = (vehicle) => {
        var data = ['films', 'pilots'];
        angular.forEach(data, (elem, inx) => {
            let arr = vehicle[elem];

            if (arr.length) getNamesPromise(arr).then(res => {
                vehicleData[elem] = res;
            });
            else vehicleData[elem] = '-';
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