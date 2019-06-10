/// <reference path="../../../typings/index.d.ts" />

module app.contacts {
    export class ContactsCtrl {
        contacts: Contact[];

        static $inject = ['AppService'];
        constructor(public appService: AppService) {
            this.load();
        }

        load() {
            this.contacts = this.appService.getContacts();
            console.log(this.contacts);
        }

        removeContact(id) {
            console.log('remove');
        }
    }


    angular
        .module('contactsManagerApp')
        .controller('ContactsCtrl', ContactsCtrl)
}
