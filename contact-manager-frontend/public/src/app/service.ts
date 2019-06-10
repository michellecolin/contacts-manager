/// <reference path="../../../typings/index.d.ts" />

module app.contact {

  export class AppService {
    methodsOptions: MethodOption[];

    static $inject = ['$http', '$location', 'SweetAlert'];
    constructor(
      public $http: ng.IHttpService,
      public $location: ng.ILocationService,
      public SweetAlert: SweetAlert,
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

    saveContact(contact) {
      this.$http({
        url: 'http://localhost:8080/api/contacts',
        method: 'POST',
        data: contact
      })
      .then((response) => {
        console.log('lalalal', response);
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
    }

    updateContact(contact: Contact) {
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