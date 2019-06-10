/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var main = angular.module('contactsManagerApp', [
        'app.templates',
        'ngRoute',
        'ngFileUpload'
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
            .when('/teste', {
            templateUrl: "app-templates/teste/teste.html",
            controller: "TesteCtrl as demoCtrlVM"
        });
        //.otherwise("/contacts");
    }
    var AppCtrl = (function () {
        function AppCtrl() {
            console.log('app controller');
        }
        return AppCtrl;
    }());
    main.controller('AppCtrl', AppCtrl);
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var contact;
    (function (contact) {
        'use strict';
        var ContactCtrl = (function () {
            function ContactCtrl() {
                this.getExcited = false;
            }
            ContactCtrl.prototype.onFileSelect = function ($files) {
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
            };
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
    var contacts;
    (function (contacts) {
        'use strict';
        var ContactsCtrl = (function () {
            function ContactsCtrl() {
                this.getExcited = false;
            }
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
        $templateCache.put("app-templates/contact/contact.html", "<div id=\"contact-css-inject\">\n  <h4 class=\"mt-4\">Create New Contact</h4>\n\n  <form>\n    <div class=\"row mt-4\">\n      <div class=\"col-2\">\n        <div class=\"avatar\" ng-class=\"{selected: file}\">\n          <img ngf-thumbnail=\"file || \'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png\'\">\n      \n          <div class=\"select button\" ngf-select=\"vm.onFileSelect($files)\" ng-model=\"file\" name=\"file\" ngf-pattern=\"\'image/*\'\"\n          ngf-accept=\"\'image/*\'\" ngf-max-size=\"20MB\" ngf-min-height=\"100\"\n          ngf-resize=\"{width: 100, height: 100}\"><i data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Change Image\" class=\"fas fa-camera\"></i></div>\n        </div>\n      </div>\n      \n      <div class=\"col-10\">\n        <div class=\"form-group\">\n          <label>Name</label>\n          <input type=\"text\" ng-model=\"vm.name\" class=\"form-control\" placeholder=\"Name\">\n        </div>\n    \n        <div class=\"form-group\">\n          <label>Nickname</label>\n          <input type=\"text\" ng-model=\"vm.name\" class=\"form-control\" placeholder=\"Name\">\n        </div>\n      </div>\n    </div>\n    <hr/>\n    <div class=\"mt-2 float-right\">\n      <a ng-href=\"#!contacts\" class=\"btn btn-secondary\">Cancel</a>\n      <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n  </form>\n</div>");
        $templateCache.put("app-templates/contacts/contacts.html", "<div id=\"people-css-inject\">\n\n	<div class=\"mt-4\">\n		<h4 class=\"float-left\">My Contact\'s List</h4>\n		\n		<a ng-href=\"#!contact\"\n			class=\"btn btn-primary float-right\">\n			<i class=\"fas fa-plus\"></i> Add Contact\n		</a>\n	</div>\n	<div class=\"clearfix\"></div>\n\n	<table class=\"mt-4 table table-hover\">\n		<thead>\n			<tr>\n				<th scope=\"col\">Name</th>\n				<th scope=\"col\" class=\"text-right\">Actions</th>\n			</tr>\n		</thead>\n		<tbody>\n			<tr >\n				<td>Jacob</td>\n				<td class=\"text-right\">\n					<button class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this contact\"><i class=\"fas fa-user-edit\"></i></button>\n					<button class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this contact\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n			<tr>\n				<td>Jacob</td>\n				<td class=\"text-right\">\n					<button class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this contact\"><i class=\"fas fa-user-edit\"></i></button>\n					<button class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this contact\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n		</tbody>\n	</table>\n</div>");
        $templateCache.put("app-templates/teste/teste.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
    }]);
