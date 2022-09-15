'use strict';

var app = angular.module('app');

app.controller('userInfoCtrl', ['$scope', 'apiDataService', '$routeParams', function ($scope, service, params) {

    var personData = $scope.personData = {
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        homeworld: ''
    };

    const init = () => {
        service.getApiData(null, 'people/' + params.id)
        .then(res => {
            setPersonData(res);
            $scope.person = res;
            return service.getApiData(res.homeworld)
        })
        .then(res => {
            personData.homeworld = res.name;
        });
    }

    init ();

    const setPersonData = (person) => {
        var data = ['films', 'species', 'vehicles', 'starships'];
        angular.forEach(data, elem => {
            let arr = person[elem];

            if (arr.length) getNamesPromise(arr).then(res => personData[elem] = res);
            else personData[elem] = '-';
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