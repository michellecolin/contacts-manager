/// <reference path="../../../typings/index.d.ts" />

module app.contact {

  'use strict';

  export interface IContactCtrl {}
  export class ContactCtrl implements IContactCtrl {
      constructor(){}
      file;
      name;
      getExcited: boolean = false;
      previewImage;

      onFileSelect($files) {
        console.log('lalala');
        console.log('fiukes', $files);
        this.file = $files[0];

        console.log(this.file);
        /*
        Upload.upload({
            url: 'my/upload/url',
            file: $files,            
        }).progress(function(e) {
        }).then(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
    }); */
    }
  }

  angular
      .module('contactsManagerApp')
      .controller('ContactCtrl', ContactCtrl)
}
