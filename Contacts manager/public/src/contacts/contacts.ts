/// <reference path="../../../typings/index.d.ts" />

module app.contacts {
    export class ContactsCtrl {
        contacts: Contact[];
        sorting: {} = {
            propertyName: 'name',
            reverse: false
        };
        
        static $inject = ['AppService', 'SweetAlert'];
        constructor(
            public appService: AppService,
            public SweetAlert: SweetAlert
        ) {
            this.load();
        }

        load() {
            this.contacts = this.appService.getContacts();
        }

        removeContact(index) {
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
                        this.appService.removeContact(index);
                        this.SweetAlert.swal({
                            title: 'Contact Removed!',
                            type: 'success',
                            text: 'Contact removed successfully.'
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
