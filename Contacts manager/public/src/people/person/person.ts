/// <reference path="../../../../typings/index.d.ts" />

module app.people.person {

  'use strict';

  export interface IPersonCtrl {}
  export class PersonCtrl implements IPersonCtrl {
      constructor(){}
      getExcited: boolean = false;
  }


  angular
      .module('contactsManagerApp')
      .controller('PersonCtrl', PersonCtrl)
}
