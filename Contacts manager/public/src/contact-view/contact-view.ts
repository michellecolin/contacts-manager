/// <reference path="../../../typings/index.d.ts" />

module app.contact {
  export class ContactViewCtrl {
    contact: Contact;
    methodsOptions: any[];

    static $inject = ['AppService', '$location', '$routeParams'];
    constructor(
      public appService: AppService,
      public $location: ng.ILocationService,
      public $routeParams: ng.route.IRouteParamsService
    ) {
      if (this.$routeParams && this.$routeParams.id) {
        this.contact = this.appService.getContact(this.$routeParams.id);
        this.methodsOptions = this.appService.getMethodsOptions();
      }
    }
  }

  angular
    .module('contactsManagerApp')
    .controller('ContactViewCtrl', ContactViewCtrl)
}
