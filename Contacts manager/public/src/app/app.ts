/// <reference path="../../../typings/index.d.ts" />

module app {
    let main = angular.module('contactsManagerApp', [
        'app.templates',
        'ngRoute',
        'ngFileUpload',
        'oitozero.ngSweetAlert'
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
        .when('/contact', {
            templateUrl: "app-templates/contact/contact.html",
            controller: "ContactCtrl as vm"
        })
        .when('/contact/:id', {
            templateUrl: "app-templates/contact/contact.html",
            controller: "ContactCtrl as vm"
        })
        .when('/contact/view/:id', {
            templateUrl: "app-templates/contact-view/contact-view.html",
            controller: "ContactViewCtrl as vm"
        })
        //.otherwise("/contacts");
    }


    //App controller
    class AppCtrl {
        constructor() {
            console.log('app controller');
        }
    }
    main.controller('AppCtrl', AppCtrl);


    //models
    interface IContact {
        id: number,
        image: any;
        name: string;
        nickname: string;
        methods: any[];
      }
    
    export class Contact implements IContact {
        constructor(
            public id: number,
            public image: any,
            public name: string,
            public nickname: string,
            public methods: any[]
        ) {}
    }
}