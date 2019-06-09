/// <reference path="../../../typings/index.d.ts" />

module app.people {

    'use strict';

    export interface IPeopleCtrl {}
    export class PeopleCtrl implements IPeopleCtrl {
        constructor(){}
        getExcited: boolean = false;
    }


    angular
        .module('contactsManagerApp')
        .controller('PeopleCtrl', PeopleCtrl)
}
