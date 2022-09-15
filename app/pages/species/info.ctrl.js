'use strict';

var app = angular.module('app');

app.controller('specieInfoCtrl', ['$scope', 'apiDataService', '$routeParams', function ($scope, service, params) {

    var specieData = $scope.specieData = {
        films: [],
        people: [],
        homeworld: ''
    };

    const init = () => {
        service.getApiData(null, 'species/' + params.id)
        .then(res => {
            setSpecieData(res);
            $scope.specie = res;
            if (res.homeworld) return service.getApiData(res.homeworld)
            else {
                specieData.homeworld = '-'
            }
        })
        .then(res => {
            if (res) {
                specieData.homeworld = res.name;
            }
        });
    }

    init ();

    const setSpecieData = (specie) => {
        var data = ['films', 'people'];
        angular.forEach(data, elem => {
            let arr = specie[elem];

            if (arr.length) getNamesPromise(arr).then(res => specieData[elem] = res);
            else specieData[elem] = '-';
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
