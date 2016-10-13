angular.module('app.controllers', ['app.services'])
    .controller('AppCtrl', function ($scope, gitlabApi) {
        console.log('AppCtrl running...');
        $scope.complete = false;

        var privatetoken = 'DXy74VpdxSu52xMKahhM';

        gitlabApi.get('groups/14/projects?private_token=' + privatetoken).then(function (res) {
            $scope.repos = res.data;
            console.log($scope.repos);
            console.info("Getting repos...");
            $scope.complete = true;
        }).catch(function (err) {
            onError(err);
        });

        var onError = function (err) {
            $scope.error = 'Sorry, we could not fetch the data. :( ERROR MESSAGE: ' + err.data.message;
        }
    })