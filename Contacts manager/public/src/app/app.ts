/// <reference path="../../../typings/index.d.ts" />
module app {
    let main = angular.module('contactsManagerApp', [
        'app.templates',
        'ngRoute'
    ]);

    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
        .when('/productList', {
            templateUrl: "app-templates/demo/demo.html",
            controller: "DemoCtrl as demoCtrlVM"
        })
        .when('/teste', {
            templateUrl: "app-templates/teste/teste.html",
            controller: "TesteCtrl as demoCtrlVM"
        })
        .otherwise("/productList");
    }
}

