/// <reference path="../../../typings/index.d.ts" />

module app.contacts {
    export class ContactsCtrl {
        contacts: Contact[];

        static $inject = ['AppService', 'SweetAlert'];
        constructor(
            public appService: AppService,
            public SweetAlert: SweetAlert
        ) {
            this.load();
        }

        load() {
            this.contacts = this.appService.getContacts();
            console.log(this.contacts);
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
    }


    angular
        .module('contactsManagerApp')
        .controller('ContactsCtrl', ContactsCtrl)
}
