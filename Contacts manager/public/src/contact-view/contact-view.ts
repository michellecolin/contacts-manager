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


      onFileSelect($files) {
          this.contact.image = $files[0];
          /*
          Upload.upload({
              url: 'my/upload/url',
              file: $files,            
          }).progress(function(e) {
          }).then(function(data, status, headers, config) {
              // file is uploaded successfully
              console.log(data);
          }); */
      }

      save() {
          if (this.contact && this.contact.name) {
              this.appService.saveContact(this.contact);
              this.$location.path('/contacts');
          }
      }
  }

  angular
      .module('contactsManagerApp')
      .controller('ContactViewCtrl', ContactViewCtrl)
}
