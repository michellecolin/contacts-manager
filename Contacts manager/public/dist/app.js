/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var main = angular.module('contactsManagerApp', [
        'app.templates',
        'ngRoute'
    ]);
    main.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/productList', {
            templateUrl: "app-templates/demo/demo.html",
            controller: "DemoCtrl as demoCtrlVM"
        })
            .when('/teste', {
            templateUrl: "app-templates/teste/teste.html",
            controller: "TesteCtrl as demoCtrlVM"
        })
            .otherwise("/productList");
    }
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var demo;
    (function (demo) {
        'use strict';
        var DemoCtrl = (function () {
            function DemoCtrl() {
                this.getExcited = false;
            }
            return DemoCtrl;
        }());
        demo.DemoCtrl = DemoCtrl;
        angular
            .module('contactsManagerApp')
            .controller('DemoCtrl', DemoCtrl);
    })(demo = app.demo || (app.demo = {}));
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
        $templateCache.put("app-templates/demo/demo.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
        $templateCache.put("app-templates/teste/teste.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.getExcited = !demoCtrlVM.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>");
    }]);
