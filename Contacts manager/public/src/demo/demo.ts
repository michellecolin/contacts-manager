/// <reference path="../../../typings/index.d.ts" />

module app.demo {

    'use strict';

    export interface IDemoCtrl {}
    export class DemoCtrl implements IDemoCtrl {
        constructor(){}
        getExcited: boolean = false;
    }


    angular
        .module('contactsManagerApp')
        .controller('DemoCtrl', DemoCtrl)
}
