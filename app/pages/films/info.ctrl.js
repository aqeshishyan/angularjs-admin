'use strict';

var app = angular.module('app');

app.controller('filmInfoCtrl', ['$scope', 'apiDataService', '$routeParams', function ($scope, service, params) {

    var filmData = $scope.filmData = {
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: []
    };

    const init = () => {
        service.getApiData(null, 'films/' + params.id)
        .then(res => {
            setFilmData(res);
            $scope.film = res;
        });
    }

    init ();

    const setFilmData = (film) => {
        var data = ['characters', 'planets', 'starships', 'vehicles', 'species'];
        angular.forEach(data, (elem) => {
            let arr = film[elem];

            if (arr.length) getNamesPromise(arr).then(res => {
                filmData[elem] = res;
            });
            else filmData[elem] = '-';
        })
    }

    const getNamesPromise = (arr) => {
        return service.getResources(arr)
        .then(res => {
            var names = '';
            angular.forEach(res, elem => {
                var name = elem.data.name;
                if (elem !== res[res.length - 1]) names += name + ', ';
                else names += name;
            })
            return names;
        });
    }
}])