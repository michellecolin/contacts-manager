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
            .when('/productList', {
            templateUrl: "app-templates/people/people.html",
            controller: "PeopleCtrl as vm"
        })
            .when('/teste', {
            templateUrl: "app-templates/teste/teste.html",
            controller: "TesteCtrl as demoCtrlVM"
        })
            .otherwise("/productList");
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
        $templateCache.put("app-templates/people/people.html", "<div id=\"people-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"vm.getExcited = !vm.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"vm.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
        $templateCache.put("app-templates/teste/teste.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
    }]);
