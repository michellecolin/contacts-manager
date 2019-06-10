/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var main = angular.module('contactsManagerApp', [
        'app.templates',
        'ngRoute',
        'ngFileUpload',
        'oitozero.ngSweetAlert'
    ]);
    //routes
    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/contacts', {
            templateUrl: "app-templates/contacts/contacts.html",
            controller: "ContactsCtrl as vm"
        })
            .when('/contact', {
            templateUrl: "app-templates/contact/contact.html",
            controller: "ContactCtrl as vm"
        })
            .when('/contact/:id', {
            templateUrl: "app-templates/contact/contact.html",
            controller: "ContactCtrl as vm"
        })
            .when('/contact/view/:id', {
            templateUrl: "app-templates/contact-view/contact-view.html",
            controller: "ContactViewCtrl as vm"
        });
        //.otherwise("/contacts");
    }
    //App controller
    var AppCtrl = (function () {
        function AppCtrl() {
            console.log('app controller');
        }
        return AppCtrl;
    }());
    main.controller('AppCtrl', AppCtrl);
    var Contact = (function () {
        function Contact(id, image, name, nickname, methods) {
            this.id = id;
            this.image = image;
            this.name = name;
            this.nickname = nickname;
            this.methods = methods;
        }
        return Contact;
    }());
    app.Contact = Contact;
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var contact;
    (function (contact_1) {
        var AppService = (function () {
            function AppService() {
                this.contacts = [
                    new app.Contact(1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyHTmJslVAT8rHW944V99fG7ivLdmPFGOOw6rKJ4HXiURG6i1', 'michelle', 'mih', [{ type: { id: 2, name: "Whatsapp", icon: "fab fa-whatsapp", $$hashKey: "object:7" }, value: "0848498489" }]),
                    new app.Contact(2, 'https://img.huffingtonpost.com/asset/5c6ab0092500003502c88ce6.jpeg?cache=Idejm45rNe&ops=scalefit_630_noupscale', 'joana', 'jô', [{ type: { id: 2, name: "Whatsapp", icon: "fab fa-whatsapp", $$hashKey: "object:7" }, value: "0848498489" }]),
                    new app.Contact(3, 'https://www.homemalpha.com.br/wp-content/uploads/2011/08/Homem-confiante.jpg', 'mateus', 'mat', [{ type: { id: 2, name: "Whatsapp", icon: "fab fa-whatsapp", $$hashKey: "object:7" }, value: "0848498489" }])
                ];
                this.methodsOptions = [
                    { id: 1, name: 'Phone', icon: 'fas fa-phone' },
                    { id: 2, name: 'Whatsapp', icon: 'fab fa-whatsapp' },
                    { id: 3, name: 'Email', icon: 'fas fa-at' },
                    { id: 4, name: 'Facebook', icon: 'fab fa-facebook-f' }
                ];
            }
            AppService.prototype.getContacts = function () {
                return this.contacts;
            };
            AppService.prototype.getMethodsOptions = function () {
                return this.methodsOptions;
            };
            AppService.prototype.saveContact = function (contact) {
                contact.id = 10;
                this.contacts.push(contact);
                console.log(this.contacts);
            };
            AppService.prototype.removeContact = function (id) {
                this.contacts.splice(id, 1);
            };
            return AppService;
        }());
        contact_1.AppService = AppService;
        angular
            .module('contactsManagerApp')
            .service('AppService', AppService);
    })(contact = app.contact || (app.contact = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var contact;
    (function (contact) {
        var ContactCtrl = (function () {
            function ContactCtrl(appService, $location, SweetAlert) {
                this.appService = appService;
                this.$location = $location;
                this.SweetAlert = SweetAlert;
                this.methodsAreValid = true;
                this.methodsOptions = this.appService.getMethodsOptions();
                this.methods = [{ type: null, value: null }];
            }
            ContactCtrl.prototype.onFileSelect = function ($files) {
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
            };
            ContactCtrl.prototype.save = function () {
                if (this.contact && this.contact.name && this.methodsValid()) {
                    this.contact.methods = this.methods;
                    this.appService.saveContact(this.contact);
                    this.$location.path('/contacts');
                }
                else {
                    if (!this.contact || !this.contact.name) {
                        this.SweetAlert.swal({
                            title: 'Name field is required!',
                            text: 'You need to fill out the name filed.',
                            type: 'error'
                        });
                    }
                    else if (!this.methodsAreValid) {
                        this.SweetAlert.swal({
                            title: 'Contact methods are incorrect!',
                            text: 'You\'ve filled out the contact methods incorrectly. Check them and try again!',
                            type: 'error'
                        });
                    }
                }
            };
            ContactCtrl.prototype.methodsValid = function () {
                var valid = true;
                if (this.methods.length > 0) {
                    this.methods.forEach(function (method) {
                        if (!method.type || !method.value) {
                            valid = false;
                        }
                    });
                }
                this.methodsAreValid = valid;
                return valid;
            };
            ContactCtrl.prototype.addMethod = function () {
                this.methods.push({ type: null, value: null });
            };
            ContactCtrl.prototype.removeMethod = function (index) {
                this.methods.splice(index, 1);
                this.methodsValid();
            };
            ContactCtrl.$inject = ['AppService', '$location', 'SweetAlert'];
            return ContactCtrl;
        }());
        contact.ContactCtrl = ContactCtrl;
        angular
            .module('contactsManagerApp')
            .controller('ContactCtrl', ContactCtrl);
    })(contact = app.contact || (app.contact = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var contact;
    (function (contact) {
        var ContactViewCtrl = (function () {
            function ContactViewCtrl(appService, $location) {
                this.appService = appService;
                this.$location = $location;
                this.methodsOptions = this.appService.getMethodsOptions();
                this.contact = new app.Contact(4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyHTmJslVAT8rHW944V99fG7ivLdmPFGOOw6rKJ4HXiURG6i1', 'michelle', 'mih', []);
            }
            ContactViewCtrl.prototype.onFileSelect = function ($files) {
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
            };
            ContactViewCtrl.prototype.save = function () {
                if (this.contact && this.contact.name) {
                    this.appService.saveContact(this.contact);
                    this.$location.path('/contacts');
                }
            };
            ContactViewCtrl.$inject = ['AppService', '$location'];
            return ContactViewCtrl;
        }());
        contact.ContactViewCtrl = ContactViewCtrl;
        angular
            .module('contactsManagerApp')
            .controller('ContactViewCtrl', ContactViewCtrl);
    })(contact = app.contact || (app.contact = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var teste;
    (function (teste) {
        'use strict';
        var TesteCtrl = (function () {
            function TesteCtrl() {
                this.getExcited = false;
                console.log('lalala');
            }
            return TesteCtrl;
        }());
        teste.TesteCtrl = TesteCtrl;
        angular
            .module('contactsManagerApp')
            .controller('TesteCtrl', TesteCtrl);
    })(teste = app.teste || (app.teste = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var contacts;
    (function (contacts) {
        var ContactsCtrl = (function () {
            function ContactsCtrl(appService, SweetAlert) {
                this.appService = appService;
                this.SweetAlert = SweetAlert;
                this.load();
            }
            ContactsCtrl.prototype.load = function () {
                this.contacts = this.appService.getContacts();
                console.log(this.contacts);
            };
            ContactsCtrl.prototype.removeContact = function (index) {
                var _this = this;
                this.SweetAlert.swal({
                    title: 'Delete this contact?',
                    text: 'Are you sure you want to delete this contact?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    closeOnConfirm: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        _this.appService.removeContact(index);
                        _this.SweetAlert.swal({
                            title: 'Contact Removed!',
                            type: 'success',
                            text: 'Contact removed successfully.'
                        });
                    }
                });
            };
            ContactsCtrl.$inject = ['AppService', 'SweetAlert'];
            return ContactsCtrl;
        }());
        contacts.ContactsCtrl = ContactsCtrl;
        angular
            .module('contactsManagerApp')
            .controller('ContactsCtrl', ContactsCtrl);
    })(contacts = app.contacts || (app.contacts = {}));
})(app || (app = {}));
angular.module("app.templates", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app-templates/contact/contact.html", "<div id=\"contact-css-inject\">\n  <h4 class=\"mt-4\">Create New Contact</h4>\n\n  <form name=\"form\" novalidate>\n    <div class=\"row mt-4\">\n      <div class=\"col-2\">\n        <label>Photo</label>\n        <div class=\"avatar\" ng-class=\"{selected: vm.contact.image}\">\n          <img ngf-thumbnail=\"vm.contact.image || \'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png\'\">\n      \n          <div class=\"select button\" ngf-select=\"vm.onFileSelect($files)\" ng-model=\"vm.contact.image\" name=\"file\" ngf-pattern=\"\'image/*\'\"\n          ngf-accept=\"\'image/*\'\" ngf-max-size=\"20MB\" ngf-min-height=\"100\"\n          ngf-resize=\"{width: 100, height: 100}\"><i data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Change Image\" class=\"fas fa-camera\"></i></div>\n        </div>\n      </div>\n      \n      <div class=\"col-10\">\n        <div class=\"form-group\">\n          <label>Name*</label>\n          <input type=\"text\" name=\"name\" ng-model=\"vm.contact.name\" class=\"form-control\" placeholder=\"Name\" required>\n          <div class=\"form-error\" ng-show=\"form.$submitted || form.name.$touched\">\n            <div ng-show=\"form.name.$error.required\">This field is required.</div>\n          </div>\n        </div>\n    \n        <div class=\"form-group\">\n          <label>Nickname</label>\n          <input type=\"text\" name=\"nickname\" ng-model=\"vm.contact.nickname\" class=\"form-control\" placeholder=\"Name\">\n        </div>\n      </div>\n    </div>\n    <hr/>\n\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <h5 class=\"mt-4\">Contact Methods</h5>\n        <p ng-if=\"!vm.methodsAreValid\" class=\"form-error\">Invalid contact methods. All fields must be completed.</p>\n        <div class=\"form-row\" ng-repeat=\"method in vm.methods\">\n          <div class=\"form-group col-md-4\">\n            <select id=\"inputState\" ng-model=\"method.type\" ng-change=\"vm.methodsValid()\" class=\"form-control\" required>\n              <option value=\"\" selected>Choose...</option>\n              <option ng-repeat=\"option in vm.methodsOptions\" ng-value=\"option\">{{option.name}}</option>\n            </select>\n          </div>\n          <div class=\"form-group col-md-7\">\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\"><i class=\"{{method.type.icon}}\"></i></span>\n              </div>\n              <input type=\"text\" ng-model=\"method.value\" ng-change=\"vm.methodsValid()\" class=\"form-control\" id=\"validationCustomUsername\" placeholder=\"{{method.type.name}}\" aria-describedby=\"inputGroupPrepend\" required>\n            </div>\n          </div>\n          <div class=\"col-md-1\">\n            <button type=\"button\" ng-click=\"vm.removeMethod($index)\" class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this method\"><i class=\"fas fa-times\"></i></button>\n          </div>\n        </div>\n        <button type=\"button\" ng-click=\"vm.addMethod()\" class=\"btn btn-primary\">+ Add Method</button>\n      </div>\n    </div>\n    <hr class=\"mt-4\"/>\n    <div class=\"float-right\">\n      <a ng-href=\"#!contacts\" class=\"btn btn-secondary\">Cancel</a>\n      <button type=\"submit\" ng-click=\"vm.save()\" class=\"btn btn-primary\">Save</button>\n    </div>\n  </form>\n</div>");
        $templateCache.put("app-templates/contact-view/contact-view.html", "<div id=\"contact-view-css-inject\">\n  <h4 class=\"mt-4\">Contact View</h4>\n    <div class=\"row mt-4\">\n      <div class=\"col-2\">\n        <div class=\"avatar\" ng-class=\"{selected: vm.contact.image}\">\n          <img src=\"{{vm.contact.image}}\">\n        </div>\n      </div>\n      \n      <div class=\"col-10\">\n        <label>Name:</label> {{vm.contact.name}}\n        <label>Nickname:</label> {{vm.contact.nickname}}\n      </div>\n    </div>\n    <hr class=\"mt-4\"/>\n    <div class=\"float-right\">\n      <a ng-href=\"#!contacts\" class=\"btn btn-primary\">Go Back</a>\n    </div>\n  </form>\n</div>");
        $templateCache.put("app-templates/teste/teste.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
        $templateCache.put("app-templates/contacts/contacts.html", "<div id=\"people-css-inject\">\n\n	<div class=\"mt-4\">\n		<h4 class=\"float-left\">My Contact\'s List</h4>\n		\n		<a ng-href=\"#!contact\"\n			class=\"btn btn-primary float-right\">\n			<i class=\"fas fa-plus\"></i> Add Contact\n		</a>\n	</div>\n	<div class=\"clearfix\"></div>\n\n	<table class=\"mt-4 table table-hover\" *ngIf=\"vm.contacts\">\n		<thead>\n			<tr>\n				<th scope=\"col\">Name</th>\n				<th scope=\"col\" class=\"text-right\">Actions</th>\n			</tr>\n		</thead>\n		<tbody>\n			<tr ng-if=\"vm.contacts.length == 0\">\n				<td colspan=\"2\">You don\'t have contacts registered :(</td>\n			</tr>\n			<tr ng-if=\"vm.contacts.length > 0\" ng-repeat=\"contact in vm.contacts\">\n				<td>{{contact.name}}</td>\n				<td class=\"text-right\">\n					<a ng-href=\"#!/contact/view/{{contact.id}}\" class=\"btn btn-primary\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"View this contact\"><i class=\"fas fa-eye\"></i></a>\n					<a ng-href=\"#!contact/{{contact.id}}\" class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this contact\"><i class=\"fas fa-user-edit\"></i></a>\n					<button ng-click=\"vm.removeContact($index)\" class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this contact\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n		</tbody>\n	</table>\n</div>");
    }]);
