angular.module('app', [])
    .controller('AppCtrl', function ($scope, $http) {
        $scope.year = new Date().getFullYear();
        $scope.complete = false;

        $http.get('https://oss-repos.filiosoft.com/')
            .then(function (res) {
                $scope.oss = res.data;
                $scope.complete = true;
            })
            .catch(function (err) {
                onError(err);
            });

        var onError = function (err) {
            $scope.error = 'There was an error fetching the data :( ' + err;
        }
    })