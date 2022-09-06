'use strict';

var app = angular.module('app');

app.controller('userInfoCtrl', ['$scope', 'apiDataService', '$routeParams', '$q', function ($scope, service, params, $q) {

    $scope.films = $scope.species = $scope.vehicles = $scope.starships = $scope.homeworld = 'loading...'
    service.getApiData(null, 'people/' + params.id)
    .then(res => {
        $scope.person = res;
        return service.getApiData(res.homeworld)
    })
    .then(res => {
        $scope.homeworld = res.name;
    });

    $scope.$watch('person', () => {
        var person = $scope.person;
        if (person) {
            if (person.species.length) getNamesPromise(person.species).then(res => $scope.species = res);
            else $scope.species = '-';

            if (person.vehicles.length) getNamesPromise(person.vehicles).then(res => $scope.vehicles = res);
            else $scope.vehicles = '-';

            if (person.starships.length) getNamesPromise(person.starships).then(res => $scope.starships = res);
            else $scope.starships = '-';

            if (person.films.length) getNamesPromise(person.films).then(res => $scope.films = res);
            else $scope.films = '-';
        }
    })

    function getNamesPromise (arr) {
        return $q.all(arr.map(elem => {
            return service.getApiData(elem)
        }))
        .then(res => {
            var names = '';
            res.map(elem => {
                var name = elem.title ? elem.title : elem.name;
                if (elem !== res[res.length - 1]) names += name + ', ';
                else names += name;
            })
            return names;
        });
    }
}])