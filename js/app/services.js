angular.module('app.services', [])
    .service('gitlabApi', function ($http) {
        return {
            get: function (api) {
                return $http.get('https://gitlab.filiosoft.com/api/v4/' + api)
                    .success(function (data) {
                        return data;
                    })
                    .error(function (err) {
                        console.error(err);
                        return err;
                    });
            }
        };
    });