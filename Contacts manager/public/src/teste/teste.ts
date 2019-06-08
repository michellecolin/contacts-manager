/// <reference path="../../../typings/index.d.ts" />

module app.teste {

    'use strict';

    export class TesteCtrl {
        constructor(){
            console.log('lalala');
        }
        getExcited: boolean = false;
    }


    angular
        .module('contactsManagerApp')
        .controller('TesteCtrl', TesteCtrl)
}
