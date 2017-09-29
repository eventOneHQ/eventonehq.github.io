angular.module('app.controllers', ['app.services'])
    .controller('AppCtrl', function ($scope, db) {
        console.log('AppCtrl running...');
        $scope.complete = false;

        db().then(function (res) {
            $scope.oss = res;
            console.info("Getting repos...");
            $scope.complete = true;
        }).catch(function (err) {
            onError(err);
        });


        var onError = function (err) {
            $scope.error = 'There was an error fetching the data :( ' + err;
        }
    })