angular.module('app.services', [])
    .service('githubApi', function ($http) {
        return {
            get: function (api) {
                return $http.get('https://api.github.com' + api)
                    .success(function (data) {
                        return data;
                    })
                    .error(function (err) {
                        console.error(err);
                        return err;
                    });
            }
        };
    })
    .service('db', function ($q, githubApi) {
        var dbAddress = 'https://db.filiosoft.com/'
        var db = new PouchDB(dbAddress + 'fs-oss');

        function getDb() {
            var defer = $q.defer();
            db.allDocs({
                include_docs: true
            }).then(function (result) {
                angular.forEach(result.rows, function (value, key) {
                    function addStarForks() {
                        var defer = $q.defer();
                        if (value.doc.githubName) {
                            githubApi.get('/repos/Filiosoft/' + value.doc.githubName).then(function (res) {
                                result.rows[key].stars = res.data.stargazers_count;
                                result.rows[key].forks = res.data.forks_count;
                                defer.resolve('Done');
                            }).catch(function (err) {
                                defer.reject(err);
                            });
                        }
                        return defer.promise;
                    }
                    addStarForks(value.doc).then(function () {
                        return defer.resolve(result.rows)
                    });
                });
            }).catch(function (err) {
                console.log(err);
                return defer.reject(err)
            });

            return defer.promise;
        }
        return getDb;
    });