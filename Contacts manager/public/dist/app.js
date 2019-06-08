/// <reference path="../../../typings/index.d.ts" />
angular.module('contactsManagerApp', [
    'app.demo',
    'app.templates'
]);
// your app setup here
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var demo;
    (function (demo) {
        'use strict';
        var DemoCtrl = (function () {
            function DemoCtrl($scope) {
                this.$scope = $scope;
            }
            return DemoCtrl;
        }());
        demo.DemoCtrl = DemoCtrl;
        var DemoService = (function () {
            function DemoService() {
                this.getExcited = false;
            }
            return DemoService;
        }());
        demo.DemoService = DemoService;
        angular
            .module('app.demo', [])
            .directive("demo", function () {
            return {
                templateUrl: 'app-templates/demo/demo.html',
                controller: DemoCtrl,
                controllerAs: 'demoCtrlVM'
            };
        })
            .controller("demoCtrl", DemoCtrl)
            .factory("demoService", [function () { return new app.demo.DemoService(); }]);
    })(demo = app.demo || (app.demo = {}));
})(app || (app = {}));
angular.module("app.templates", []).run(["$templateCache", function ($templateCache) { $templateCache.put("app-templates/demo/demo.html", "<div id=\"demo-css-inject\">\n\n	<h2>Hello directive!</h2>\n\n	<button ng-click=\"demoCtrlVM.demoService.getExcited = !demoCtrlVM.demoService.getExcited\">\n		Go ahead, click me - I\'m wired up to ng ready to go!\n	</button>\n	<div ng-show=\"demoCtrlVM.demoService.getExcited\">\n		<h3>Yeeehaww!</h3>\n	</div>\n\n</div>"); }]);
