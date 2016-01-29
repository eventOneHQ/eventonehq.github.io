'use strict';

angular.module('app').config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'index.html',
            controller: 'MainCtrl'
        })
})