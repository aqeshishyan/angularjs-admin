'use strict';

var app = angular.module('app');

app.controller('starshipInfoCtrl', ['$scope', 'apiDataService', '$routeParams', function ($scope, service, params) {

    var starshipData = $scope.starshipData = {
        films: [],
        pilots: []
    };

    const init = () => {
        service.getApiData(null, 'starships/' + params.id)
        .then(res => {
            setStarshipData(res);
            $scope.starship = res;
        });
    }

    init ();

    const setStarshipData = (starship) => {
        var data = ['films', 'pilots'];
        angular.forEach(data, (elem, inx) => {
            let arr = starship[elem];

            if (arr.length) getNamesPromise(arr).then(res => {
                starshipData[elem] = res;
            });
            else starshipData[elem] = '-';
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