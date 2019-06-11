/// <reference path="../../../typings/index.d.ts" />

module app.contact {

  export class AppService {
    methodsOptions: MethodOption[];

    static $inject = ['$http', '$location', 'SweetAlert', 'Upload'];
    constructor(
      public $http: ng.IHttpService,
      public $location: ng.ILocationService,
      public SweetAlert: SweetAlert,
      public Upload: Upload
    ) {
      this.methodsOptions = [
        new MethodOption(1, 'Phone', 'fas fa-phone'),
        new MethodOption(2, 'Whatsapp', 'fab fa-whatsapp'),
        new MethodOption(3, 'Email', 'fas fa-at'),
        new MethodOption(4, 'Facebook', 'fab fa-facebook-f')
      ];
    }

    getContact(id) {
      return this.$http.get('http://localhost:8080/api/contacts/' + id);
    }

    getContacts() {
      return this.$http.get('http://localhost:8080/api/contacts');
    }

    getMethodsOptions() {
      return this.methodsOptions;
    }

    saveContact(contact, callBack = false) {
      if (callBack || !contact.image) {
        //Image has been uploaded, time to save the contact
        this.$http({
          url: 'http://localhost:8080/api/contacts',
          method: 'POST',
          data: contact
        })
        .then(() => {
          this.SweetAlert.swal({
            title: 'Contact saved!',
            text: 'Contact saved successfully.',
            type: 'success'
          });
          this.$location.path('/contacts');
        }, 
        (err) => { // err
          this.showAPIError(err);
        });
      } else {
        this.uploadImage(contact, 'saveContact');
      }
    }

    uploadImage(contact, callBack) {
      this.Upload.upload({
        url: 'http://localhost:8080/api/upload',
        method: 'POST',
        data: {file: contact.image}
      }).then((response) => {
        contact.image = response.data.data._id;
        console.log('hsdahodsa');
        if (callBack == 'saveContact') {
          console.log('sdjfijfsd');
          this.saveContact(contact, true);
        } else {
          console.log('allala');
          this.updateContact(contact, true);
        }
      });
    }

    updateContact(contact, callBack = false) {
      if (callBack || !contact.image) {
        console.log('lalal');
        this.$http({
          url: `http://localhost:8080/api/contacts/${contact._id}`,
          method: 'PUT',
          data: contact
        })
        .then((response) => {
          this.SweetAlert.swal({
            title: 'Contact saved!',
            text: 'Contact saved successfully.',
            type: 'success'
          });
          this.$location.path('/contacts');
          //this.contacts.push(contact);
        }, 
        (err) => { // err
          this.showAPIError(err);
        });
      } else {
        this.uploadImage(contact, this.saveContact);
      }
    }

    removeContact(id) {
      return this.$http({
        url: `http://localhost:8080/api/contacts/${id}`,
        method: 'DELETE'
      });
    }

    showAPIError(err) {
      this.SweetAlert.swal({
        title: 'Something went wrong!',
        type: 'error',
        text: err.statusText
      });
    }
  }

  angular
    .module('contactsManagerApp')
    .service('AppService', AppService)
}