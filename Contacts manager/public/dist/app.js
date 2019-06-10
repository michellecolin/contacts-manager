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
                    new app.Contact(1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyHTmJslVAT8rHW944V99fG7ivLdmPFGOOw6rKJ4HXiURG6i1', 'michelle', 'mih', [{ type: { id: 2, name: "Whatsapp", icon: "fab fa-whatsapp" }, value: 0848498489 }]),
                    new app.Contact(2, 'https://img.huffingtonpost.com/asset/5c6ab0092500003502c88ce6.jpeg?cache=Idejm45rNe&ops=scalefit_630_noupscale', 'joana', 'jô', [{ type: { id: 2, name: "Whatsapp", icon: "fab fa-whatsapp" }, value: 0848498489 }]),
                    new app.Contact(3, 'https://www.homemalpha.com.br/wp-content/uploads/2011/08/Homem-confiante.jpg', 'mateus', 'mat', [{ type: { id: 2, name: "Whatsapp", icon: "fab fa-whatsapp" }, value: 0848498489 }])
                ];
                this.methodsOptions = [
                    { id: 1, name: 'Phone', icon: 'fas fa-phone' },
                    { id: 2, name: 'Whatsapp', icon: 'fab fa-whatsapp' },
                    { id: 3, name: 'Email', icon: 'fas fa-at' },
                    { id: 4, name: 'Facebook', icon: 'fab fa-facebook-f' }
                ];
            }
            AppService.prototype.getContact = function (id) {
                return this.contacts.find(function (contact) {
                    return contact.id == id;
                });
            };
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
            AppService.prototype.updateContact = function (contact) {
                this.contacts.find(function (ctc) {
                    if (ctc.id === contact.id) {
                        ctc = contact;
                    }
                });
            };
            AppService.prototype.removeContact = function (id) {
                this.contacts = this.contacts.filter(function (contact) {
                    return contact.id != id;
                });
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
            function ContactCtrl(appService, $location, SweetAlert, $routeParams) {
                this.appService = appService;
                this.$location = $location;
                this.SweetAlert = SweetAlert;
                this.$routeParams = $routeParams;
                this.methodsAreValid = true;
                this.editMode = false;
                if (this.$routeParams && this.$routeParams.id) {
                    this.contact = this.appService.getContact(this.$routeParams.id);
                    this.methods = this.contact.methods;
                    this.editMode = true;
                }
                else {
                    this.methods = [{ type: null, value: null }];
                }
                this.methodsOptions = this.appService.getMethodsOptions();
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
                    if (this.editMode) {
                        this.appService.updateContact(this.contact);
                    }
                    else {
                        this.appService.saveContact(this.contact);
                    }
                    this.SweetAlert.swal({
                        title: 'Contact saved!',
                        text: 'Contact saved successfully.',
                        type: 'success'
                    });
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
            ContactCtrl.prototype.methodsValid = function (method) {
                if (method === void 0) { method = null; }
                if (method) {
                    method.value = null;
                }
                ;
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
            ContactCtrl.$inject = ['AppService', '$location', 'SweetAlert', '$routeParams'];
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
            function ContactViewCtrl(appService, $location, $routeParams) {
                this.appService = appService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                if (this.$routeParams && this.$routeParams.id) {
                    this.contact = this.appService.getContact(this.$routeParams.id);
                    this.methodsOptions = this.appService.getMethodsOptions();
                }
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
            ContactViewCtrl.$inject = ['AppService', '$location', '$routeParams'];
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
    var contacts;
    (function (contacts) {
        var ContactsCtrl = (function () {
            function ContactsCtrl(appService, SweetAlert) {
                this.appService = appService;
                this.SweetAlert = SweetAlert;
                this.sorting = {
                    propertyName: 'name',
                    reverse: false
                };
                this.sortBy = function (propertyName) {
                    this.sorting.reverse = (this.sorting.propertyName === propertyName) ? !this.sorting.reverse : false;
                    this.sorting.propertyName = propertyName;
                };
                this.load();
            }
            ContactsCtrl.prototype.load = function () {
                this.contacts = this.appService.getContacts();
            };
            ContactsCtrl.prototype.removeContact = function (id) {
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
                        _this.appService.removeContact(id);
                        _this.contacts = _this.appService.contacts;
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
angular.module("app.templates", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app-templates/contact/contact.html", "<div id=\"contact-css-inject\">\n  <h4 class=\"mt-4\">Create New Contact</h4>\n\n  <form name=\"form\" novalidate>\n    <div class=\"row mt-4\">\n      <div class=\"col-2\">\n        <label>Photo</label>\n        <div class=\"avatar\" ng-class=\"{selected: vm.contact.image}\">\n          <img ngf-thumbnail=\"vm.contact.image || \'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png\'\">\n      \n          <div class=\"select button\" ngf-select=\"vm.onFileSelect($files)\" ng-model=\"vm.contact.image\" name=\"file\" ngf-pattern=\"\'image/*\'\"\n          ngf-accept=\"\'image/*\'\" ngf-max-size=\"20MB\" ngf-min-height=\"100\"\n          ngf-resize=\"{width: 100, height: 100}\"><i data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Change Image\" class=\"fas fa-camera\"></i></div>\n        </div>\n      </div>\n      \n      <div class=\"col-10\">\n        <div class=\"form-group\">\n          <label>Name*</label>\n          <input type=\"text\" name=\"name\" ng-model=\"vm.contact.name\" class=\"form-control\" placeholder=\"Name\" required>\n          <div class=\"form-error\" ng-show=\"form.$submitted || form.name.$touched\">\n            <div ng-show=\"form.name.$error.required\">This field is required.</div>\n          </div>\n        </div>\n    \n        <div class=\"form-group\">\n          <label>Nickname</label>\n          <input type=\"text\" name=\"nickname\" ng-model=\"vm.contact.nickname\" class=\"form-control\" placeholder=\"Name\">\n        </div>\n      </div>\n    </div>\n    <hr/>\n\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <h5 class=\"mt-4\">Contact Methods</h5>\n        <p ng-if=\"!vm.methodsAreValid\" class=\"form-error\">Invalid contact methods. All fields must be completed.</p>\n        <div class=\"form-row\" ng-repeat=\"method in vm.methods\">\n          <div class=\"form-group col-md-4\">\n            <select \n              id=\"inputState\" \n              ng-model=\"method.type\" \n              ng-options=\"option.name for option in vm.methodsOptions track by option.id\" \n              ng-change=\"vm.methodsValid(method)\" \n              class=\"form-control\" \n              plpaceholder=\"Select\"\n              required>\n              <option value=\"\">Choose...</option>\n            </select>\n          </div>\n          <div class=\"form-group col-md-7\">\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\"><i class=\"{{method.type.icon}}\"></i></span>\n              </div>\n              <input type=\"text\" ng-model=\"method.value\" ng-change=\"vm.methodsValid()\" class=\"form-control\" id=\"validationCustomUsername\" placeholder=\"{{method.type.name}}\" aria-describedby=\"inputGroupPrepend\" required>\n            </div>\n          </div>\n          <div class=\"col-md-1\">\n            <button type=\"button\" ng-click=\"vm.removeMethod($index)\" class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this method\"><i class=\"fas fa-times\"></i></button>\n          </div>\n        </div>\n        <button type=\"button\" ng-click=\"vm.addMethod()\" class=\"btn btn-primary\">+ Add Method</button>\n      </div>\n    </div>\n    <hr class=\"mt-4\"/>\n    <div class=\"float-right\">\n      <a ng-href=\"#!contacts\" class=\"btn btn-secondary\">Cancel</a>\n      <button type=\"submit\" ng-click=\"vm.save()\" class=\"btn btn-primary\">Save</button>\n    </div>\n  </form>\n</div>");
        $templateCache.put("app-templates/contact-view/contact-view.html", "<div id=\"contact-view-css-inject\">\n  <nav class=\"mt-4 navbar p-0\">\n    <h4>Contact View</h4>\n    <a ng-href=\"#!contact/{{vm.contact.id}}\" class=\"btn btn-primary\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this contact\">Edit Contact</a>\n  </nav>\n  \n  <div class=\"row mt-4\">\n    <div class=\"col-2\">\n      <div class=\"avatar\" style=\"background-image: url(\'{{vm.contact.image}}\')\" ng-class=\"{selected: vm.contact.image}\">\n      </div>\n    </div>\n    \n    <div class=\"col-10\">\n      <ul class=\"list-group\">\n        <li class=\"list-group-item p-0\">\n          <div class=\"title\">Name</div> \n          <div class=\"text\">{{vm.contact.name}}</div>\n        </li>\n        <li ng-if=\"vm.contact.nickname\" class=\"list-group-item p-0\">\n          <div class=\"title\">Nickname</div> \n          <div class=\"text\">{{vm.contact.nickname}}</div>\n        </li>\n        <li ng-repeat=\"method in vm.contact.methods\" class=\"list-group-item p-0\">\n          <div class=\"title\"><i class=\"{{method.type.icon}}\"></i> {{method.type.name}}</div>\n          <div class=\"text\">{{method.value}}</div>\n        </li>\n      </ul>\n    </div>\n  </div>\n  <hr class=\"mt-4\"/>\n  <div class=\"float-right\">\n    <a ng-href=\"#!contacts\" class=\"btn btn-secondary\">Go Back</a>\n  </div>\n</div>");
        $templateCache.put("app-templates/contacts/contacts.html", "<div id=\"people-css-inject\">\n\n	<div class=\"mt-4\">\n		<h4>My Contact\'s List</h4>\n	</div>\n\n	<nav class=\"mt-4 navbar p-0\">\n		<form class=\"form-inline\">\n			<input ng-model=\"vm.searchText\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Search through your contact\"  class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Search\">\n		</form>\n		<a ng-href=\"#!contact\"\n			class=\"btn btn-primary float-right\">\n			<i class=\"fas fa-plus\"></i> Add Contact\n		</a>\n	</nav>\n\n\n	<table class=\"mt-4 table table-hover\" *ngIf=\"vm.contacts\">\n		<thead>\n			<tr>\n				<th class=\"image\"></th>\n				<th scope=\"col\">\n					<span ng-click=\"vm.sortBy(\'name\')\">Name</span>\n					<span class=\"sortorder\" ng-show=\"vm.sorting.propertyName === \'name\'\" ng-class=\"{reverse: vm.sorting.reverse}\"></span>\n				</th>\n				<th scope=\"col\" class=\"text-right\">Actions</th>\n			</tr>\n		</thead>\n		<tbody>\n			<tr ng-if=\"vm.contacts.length == 0\">\n				<td colspan=\"3\">You don\'t have contacts registered :(</td>\n			</tr>\n			<tr ng-if=\"vm.contacts.length > 0\" ng-repeat=\"contact in filteredContacts = (vm.contacts | orderBy:vm.sorting.propertyName:vm.sorting.reverse | filter:vm.searchText)\">\n				<td><div class=\"avatar small\" style=\"background-image: url(\'{{contact.image}}\')\"></div>\n				<td>{{contact.name}}</td>\n				<td class=\"text-right\">\n					<a ng-href=\"#!/contact/view/{{contact.id}}\" class=\"btn btn-primary\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"View this contact\"><i class=\"fas fa-eye\"></i></a>\n					<a ng-href=\"#!contact/{{contact.id}}\" class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this contact\"><i class=\"fas fa-user-edit\"></i></a>\n					<button ng-click=\"vm.removeContact(contact.id)\" class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this contact\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n			<tr ng-if=\"filteredContacts.length === 0\">\n				<td colspan=\"3\">No results found for the search term \"<b>{{vm.searchText}}</b>\" :(</td>\n			</tr>\n		</tbody>\n	</table>\n</div>");
        $templateCache.put("app-templates/teste/teste.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
    }]);
