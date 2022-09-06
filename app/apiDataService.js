angular.module('app')

.service('apiDataService', ['$http', '$q', function ($http, $q) {
    return {
        getApiData: (link, type) => {
            const baseUrl = 'http://swapi.dev/api/';
            const url = link || baseUrl + type;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url
            })
            .then(res => {
                deferred.resolve(res.data)
            })
            .catch(err => deferred.reject(err));

            return deferred.promise;       
        }
    }
}])
