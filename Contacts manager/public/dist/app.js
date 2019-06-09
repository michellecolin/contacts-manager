/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var main = angular.module('contactsManagerApp', [
        'app.templates',
        'ngRoute'
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
            .when('/person', {
            templateUrl: "app-templates/people/person/person.html",
            controller: "PersonCtrl as vm"
        })
            .when('/teste', {
            templateUrl: "app-templates/teste/teste.html",
            controller: "TesteCtrl as demoCtrlVM"
        })
            .otherwise("/contacts");
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
/// <reference path="../../../../typings/index.d.ts" />
var app;
(function (app) {
    var people;
    (function (people) {
        var person;
        (function (person) {
            'use strict';
            var PersonCtrl = (function () {
                function PersonCtrl() {
                    this.getExcited = false;
                }
                return PersonCtrl;
            }());
            person.PersonCtrl = PersonCtrl;
            angular
                .module('contactsManagerApp')
                .controller('PersonCtrl', PersonCtrl);
        })(person = people.person || (people.person = {}));
    })(people = app.people || (app.people = {}));
})(app || (app = {}));
angular.module("app.templates", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app-templates/contacts/contacts.html", "<div id=\"people-css-inject\">\n\n	<div class=\"mt-4\">\n		<h5 class=\"float-left\">My Contact\'s List</h5>\n		<button class=\"btn btn-primary float-right\"><i class=\"fas fa-plus\"></i> Add Contact</button>\n	</div>\n	<div class=\"clearfix\"></div>\n\n	<table class=\"mt-4 table table-hover\">\n		<thead>\n			<tr>\n				<th scope=\"col\">Name</th>\n				<th scope=\"col\" class=\"text-right\">Actions</th>\n			</tr>\n		</thead>\n		<tbody>\n			<tr >\n				<td>Jacob</td>\n				<td class=\"text-right\">\n					<button class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this contact\"><i class=\"fas fa-user-edit\"></i></button>\n					<button class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this contact\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n			<tr>\n				<td>Jacob</td>\n				<td class=\"text-right\">\n					<button class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this contact\"><i class=\"fas fa-user-edit\"></i></button>\n					<button class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this contact\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n		</tbody>\n	</table>\n</div>");
        $templateCache.put("app-templates/teste/teste.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
        $templateCache.put("app-templates/contacts/person/contacts.html", "<div id=\"person-css-inject\">\n  <h5 class=\"mt-4\">Person\'s Form</h5>\n  <p>Create a new person</p>\n\n  <form>\n    <div class=\"form-group\">\n      <label for=\"exampleInputEmail1\">Email address</label>\n      <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\n      <small id=\"emailHelp\" class=\"form-text text-muted\">We\'ll never share your email with anyone else.</small>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"exampleInputPassword1\">Password</label>\n      <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n    </div>\n    <div class=\"form-group form-check\">\n      <input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\">\n      <label class=\"form-check-label\" for=\"exampleCheck1\">Check me out</label>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n  </form>\n\n</div>");
    }]);
