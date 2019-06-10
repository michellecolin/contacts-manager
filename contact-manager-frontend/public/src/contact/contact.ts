/// <reference path="../../../typings/index.d.ts" />

module app.contact {
  export class ContactCtrl {
    contact: Contact;
    methodsOptions: any[];
    methods: any[];
    methodsAreValid: boolean = true;
    editMode: boolean = false;

    static $inject = ['AppService', '$location', 'SweetAlert', '$routeParams'];
    constructor(
      public appService: AppService,
      public $location: ng.ILocationService,
      public SweetAlert: SweetAlert,
      public $routeParams: ng.route.IRouteParamsService
    ) {
      if (this.$routeParams && this.$routeParams.id) {
        this.contact = this.appService.getContact(this.$routeParams.id).then((result : ng.IHttpPromiseCallbackArg<{}>) => {
          this.contact = result.data.data;
          this.methods = this.contact.methods;
          this.editMode = true;
        }, (err) => { // err
          this.appService.showAPIError(err);
        });
        
      } else {
        this.methods = [{ type: null, value: null }];
      }
      this.methodsOptions = this.appService.getMethodsOptions();
    }

    onFileSelect($files) {
      console.log($files);
      this.contact.image = $files[0];
    }

    save() {
      if (this.contact && this.contact.name && this.methodsValid()) {
        this.contact.methods = this.methods;
        if (this.editMode) {
          this.appService.updateContact(this.contact);
        } else {
          this.appService.saveContact(this.contact);
        }
      } else {
        if (!this.contact || !this.contact.name) {
          this.SweetAlert.swal({
            title: 'Name field is required!',
            text: 'You need to fill out the name filed.',
            type: 'error'
          });
        } else if (!this.methodsAreValid) {
          this.SweetAlert.swal({
            title: 'Contact methods are incorrect!',
            text: 'You\'ve filled out the contact methods incorrectly. Check them and try again!',
            type: 'error'
          });
        }
      }
    }

    methodsValid(method = null) {
      if (method) { method.value = null };

      let valid = true;
      if (this.methods.length > 0) {
        this.methods.forEach(method => {
          if (!method.type || !method.value) {
            valid = false;
          }
        });
      }

      this.methodsAreValid = valid;
      return valid;
    }

    addMethod() {
      this.methods.push({ type: null, value: null });
    }

    removeMethod(index) {
      this.methods.splice(index, 1);
      this.methodsValid();
    }
  }

  angular
    .module('contactsManagerApp')
    .controller('ContactCtrl', ContactCtrl)
}
