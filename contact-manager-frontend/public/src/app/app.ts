/// <reference path="../../../typings/index.d.ts" />

module app {
  let main = angular.module('contactsManagerApp', [
    'app.templates',
    'ngRoute',
    'ngFileUpload',
    'oitozero.ngSweetAlert'
  ]);

  //App controller
  class AppCtrl {
    constructor() {
      console.log('app controller');
    }
  }
  main.controller('AppCtrl', AppCtrl);

  //routes
  main.config(routeConfig);
  routeConfig.$inject = ['$routeProvider'];
  function routeConfig($routeProvider: ng.route.IRouteProvider): void {
    $routeProvider
    .when('/contacts', {
      templateUrl: 'app-templates/contacts/contacts.html',
      controller: 'ContactsCtrl as vm'
    })
    .when('/contact', {
      templateUrl: 'app-templates/contact/contact.html',
      controller: 'ContactCtrl as vm'
    })
    .when('/contact/:id', {
      templateUrl: 'app-templates/contact/contact.html',
      controller: 'ContactCtrl as vm'
    })
    .when('/contact/view/:id', {
      templateUrl: 'app-templates/contact-view/contact-view.html',
      controller: 'ContactViewCtrl as vm'
    })
    .otherwise('/contacts');
  }

  
  //Models
  interface IContact {
    _id: string,
    image: any;
    name: string;
    nickname: string;
    methods: any[];
  }
  
  export class Contact implements IContact {
    constructor(
      public _id: string,
      public image: any,
      public name: string,
      public nickname: string,
      public methods: any[]
    ) {}
  }

  interface IMethod {
    type: MethodOption, 
    value: string
  }

  export class Method implements IMethod {
    constructor(
      public type: MethodOption, 
      public value: string
    ) {}
  }

  interface IMethodOption {
    id: number;
    name: String;
    icon: String;
  }

  export class MethodOption implements IMethodOption {
    constructor(
      public id: number,
      public name: string,
      public icon: string
    ) {}
  }
}