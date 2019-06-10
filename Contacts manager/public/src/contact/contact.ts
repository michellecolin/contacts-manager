/// <reference path="../../../typings/index.d.ts" />

module app.contact {
    export class ContactCtrl {
        contact: Contact;
        methodsOptions: any[];
        methods: any[];
        methodsAreValid: boolean = true;
           
        static $inject = ['AppService', '$location', 'SweetAlert'];
        constructor(
            public appService: AppService,
            public $location: ng.ILocationService,
            public SweetAlert: SweetAlert
        ) {
            this.methodsOptions = this.appService.getMethodsOptions();
            this.methods = [{type: null, value: null}];
        }


        onFileSelect($files) {
            this.contact.image = $files[0];
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

        save() {
            if (this.contact && this.contact.name && this.methodsValid()) {
                this.contact.methods = this.methods;
                this.appService.saveContact(this.contact);
                this.$location.path('/contacts');
            } else {
                if (!this.contact || !this.contact.name) {
                    this.SweetAlert.swal({
                        title: 'Name field is required!',
                        text: 'You need to fill out the name filed.',
                        type: 'error'
                    }); 
                } else if (!this.methodsAreValid) {
                    this.SweetAlert.swal({
                        title: 'Contact methods are incorrect!',
                        text: 'You\'ve filled out the contact methods incorrectly. Check them and try again!',
                        type: 'error'
                    }); 
                }
            }
        }

        methodsValid() {
            let valid = true;
            if (this.methods.length > 0) {
                this.methods.forEach(method => {
                    if (!method.type || !method.value) {
                        valid = false;
                    }
                });
            } 

            this.methodsAreValid = valid;
            return valid;
        }

        addMethod() {
            this.methods.push({type: null, value: null});
        }

        removeMethod(index) {
            this.methods.splice(index, 1);
            this.methodsValid();
        }
    }

    angular
        .module('contactsManagerApp')
        .controller('ContactCtrl', ContactCtrl)
}
