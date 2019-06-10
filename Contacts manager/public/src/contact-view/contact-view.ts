/// <reference path="../../../typings/index.d.ts" />

module app.contact {
  export class ContactViewCtrl {
      contact: Contact;
      methodsOptions: any[];

      static $inject = ['AppService', '$location'];
      constructor(
          public appService: AppService,
          public $location: ng.ILocationService
      ) {
        this.methodsOptions = this.appService.getMethodsOptions();
        this.contact = new Contact(4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyHTmJslVAT8rHW944V99fG7ivLdmPFGOOw6rKJ4HXiURG6i1', 'michelle', 'mih', [])
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
