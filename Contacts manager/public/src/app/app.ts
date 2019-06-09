/// <reference path="../../../typings/index.d.ts" />
module app {
    let main = angular.module('contactsManagerApp', [
        'app.templates',
        'ngRoute'
    ]);

    //routes
    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
        .when('/contacts', {
            templateUrl: "app-templates/contacts/contacts.html",
            controller: "ContactsCtrl as vm"
        })
        .when('/person', {
            templateUrl: "app-templates/people/person/person.html",
            controller: "PersonCtrl as vm"
        })
        .when('/teste', {
            templateUrl: "app-templates/teste/teste.html",
            controller: "TesteCtrl as demoCtrlVM"
        })
        .otherwise("/contacts");
    }

    class AppCtrl {
        constructor() {
            console.log('app controller');
        }
    }
    main.controller('AppCtrl', AppCtrl);
}