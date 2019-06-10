/// <reference path="../../../typings/index.d.ts" />

module app.contacts {
  export class ContactsCtrl {
    contacts: Contact[];
    sorting: {} = {
      propertyName: 'name',
      reverse: false
    };
    loading: boolean;
    
    static $inject = ['AppService', 'SweetAlert'];
    constructor(
      public appService: AppService,
      public SweetAlert: SweetAlert
    ) {
      this.load();
    }

    load() {
      this.loading = true;
      this.appService.getContacts().then((result : ng.IHttpPromiseCallbackArg<{}>) => {
        this.contacts = result.data.data;
        this.loading = false;
      }, (err) => { // err
        this.appService.showAPIError(err);
      });
    }

    removeContact(id) {
      this.SweetAlert.swal(
        {
          title: 'Delete this contact?',
          text: 'Are you sure you want to delete this contact?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          closeOnConfirm: false
        }, 
        (isConfirm) => { 
          if (isConfirm) {
            this.appService.removeContact(id).then((result : ng.IHttpPromiseCallbackArg<{}>) => {
              this.contacts = this.contacts.filter(contact => {
                return contact._id !== id;
              });
              this.SweetAlert.swal({
                title: 'Contact Removed!',
                type: 'success',
                text: 'Contact removed successfully.'
              });
            }, (err) => { // err
              this.appService.showAPIError(err);
            });
          }
        });
    }

    sortBy = function(propertyName) {
      this.sorting.reverse = (this.sorting.propertyName === propertyName) ? !this.sorting.reverse : false;
      this.sorting.propertyName = propertyName;
    };
  }

  angular
    .module('contactsManagerApp')
    .controller('ContactsCtrl', ContactsCtrl)
}
