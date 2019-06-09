/// <reference path="../../../typings/index.d.ts" />

module app.contacts {

    'use strict';

    export interface IContactsCtrl {}
    export class ContactsCtrl implements IContactsCtrl {
        constructor(){}
        getExcited: boolean = false;
    }


    angular
        .module('contactsManagerApp')
        .controller('ContactsCtrl', ContactsCtrl)
}
