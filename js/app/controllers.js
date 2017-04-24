angular.module('app.controllers', ['app.services'])
    .controller('AppCtrl', function ($scope, gitlabApi, db) {
        console.log('AppCtrl running...');
        $scope.complete = false;

        gitlabApi.get('groups/14/projects').then(function (res) {
            $scope.repos = res.data;
            $scope.complete = true;
        }).catch(function (err) {
            console.log(err);
            onError(err.data.error);
        });

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