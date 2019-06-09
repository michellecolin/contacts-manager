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
            .when('/people', {
            templateUrl: "app-templates/people/people.html",
            controller: "PeopleCtrl as vm"
        })
            .when('/people/:id', {
            templateUrl: "app-templates/people/people.html",
            controller: "PeopleCtrl as vm"
        })
            .when('/teste', {
            templateUrl: "app-templates/teste/teste.html",
            controller: "TesteCtrl as demoCtrlVM"
        })
            .otherwise("/people");
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
    var people;
    (function (people) {
        'use strict';
        var PeopleCtrl = (function () {
            function PeopleCtrl() {
                this.getExcited = false;
            }
            return PeopleCtrl;
        }());
        people.PeopleCtrl = PeopleCtrl;
        angular
            .module('contactsManagerApp')
            .controller('PeopleCtrl', PeopleCtrl);
    })(people = app.people || (app.people = {}));
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
        $templateCache.put("app-templates/people/people.html", "<div id=\"people-css-inject\">\n\n	<div class=\"mt-4\">\n		<h5 class=\"float-left\">People\'s List</h5>\n		<button class=\"btn btn-primary float-right\"><i class=\"fas fa-plus\"></i> Add Person</button>\n	</div>\n	<div class=\"clearfix\"></div>\n\n	<table class=\"mt-4 table table-hover\">\n		<thead>\n			<tr>\n				<th scope=\"col\">Name</th>\n				<th scope=\"col\">N° Contacts</th>\n				<th scope=\"col\">Actions</th>\n			</tr>\n		</thead>\n		<tbody>\n			<tr>\n				<td>Jacob</td>\n				<td>10</td>\n				<td>\n					<button class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this person\"><i class=\"fas fa-user-edit\"></i></button>\n					<button class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this person\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n			<tr>\n				<td>Jacob</td>\n				<td>10</td>\n				<td>\n					<button class=\"btn btn-success\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Edit this person\"><i class=\"fas fa-user-edit\"></i></button>\n					<button class=\"btn btn-danger\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this person\"><i class=\"fas fa-times\"></i></button>\n				</td>\n			</tr>\n		</tbody>\n	</table>\n</div>");
        $templateCache.put("app-templates/teste/teste.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
    }]);
