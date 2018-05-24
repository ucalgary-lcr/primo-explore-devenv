(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

(function () {
    "use strict";
    'use strict';

    //need to figure out how to pass in view code instead of hardcoding to NUdev for image path

    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/
    /*
    In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition
    */
    /*
    var app = angular.module('centralCustom', ['angularLoad']);
    */
    /****************************************************************************************************/

    app.controller('prmBriefResultContainerAfterController', ['$scope', function ($scope) {
        var vm = this;
        vm.$onInit = function () {
            vm.prmBriefResultCtrl.upFrontActionsService.actionIconNamesMap["report_a_problem"] = "report_a_problem";
            vm.prmBriefResultCtrl.upFrontActionsService.actionLabelNamesMap["report_a_problem"] = "Report a Problem";
            vm.prmBriefResultCtrl.actionsIcons["report_a_problem"] = {
                icon: "ic_announcement_24px",
                iconSet: "action",
                type: "svg"
            };
            //TODO - what about if something gets added to this list - may need to refactor for loop
            var index = vm.prmBriefResultCtrl.upFrontActionsService.requiredUpFrontActionsList.length;
            if (vm.prmBriefResultCtrl.upFrontActionsService.requiredUpFrontActionsList[0] != "report_a_problem") { // ensure we aren't duplicating the entry
                if (index > 1) {
                    vm.prmBriefResultCtrl.upFrontActionsService.requiredUpFrontActionsList[index - (index - 2)] = vm.prmBriefResultCtrl.upFrontActionsService.requiredUpFrontActionsList[1]
                }
                vm.prmBriefResultCtrl.upFrontActionsService.requiredUpFrontActionsList[index - (index - 1)] = vm.prmBriefResultCtrl.upFrontActionsService.requiredUpFrontActionsList[0]
                vm.prmBriefResultCtrl.upFrontActionsService.requiredUpFrontActionsList[0] = "report_a_problem";
            }
            if (vm.prmBriefResultCtrl.searchService.vid == "UCALGARY") { //if using prod view, use prod links
                var url = "https://lms.library.ucalgary.ca/report-problem/index.php?resource=" + vm.prmBriefResultCtrl.item.pnx.display.title[0] + "&docID=" + encodeURIComponent(vm.prmBriefResultCtrl.item.pnx.control.recordid);
                //var url = "https://lms.library.ucalgary.ca/report-problem/index.php?resource="+vm.prmActionCtrl.item.pnx.display.title[0]+"&docID="+encodeURIComponent(vm.prmActionCtrl.item.pnx.control.recordid);

            } else { //not prod view, don't use prod links
                var url = "https://lms.library.ucalgary.ca/report-problem/index.php?resource=" + vm.prmBriefResultCtrl.item.pnx.display.title[0] + "&docID=" + encodeURIComponent(vm.prmBriefResultCtrl.item.pnx.control.recordid);
                //var url = "https://lms.library.ucalgary.ca/report-problem/index.php?resource="+vm.prmActionCtrl.item.pnx.display.title[0]+"&docID="+encodeURIComponent(vm.prmActionCtrl.item.pnx.control.recordid);

            }
            vm.prmBriefResultCtrl.openTab = function (e, t) {
                e.stopPropagation();
                if (t == "report_a_problem") {
                    window.open(url, '_blank');
                } else {
                    this.openItemMenu(e);
                    this.selectedAction = t;
                }
            };
        };
    }]);
    app.component('prmBriefResultContainerAfter', {
        require: {
            prmBriefResultCtrl: '^prmBriefResultContainer',
        },
        controller: 'prmBriefResultContainerAfterController'
    });

    /*end add report a problem*/

    /*add proquest account id for service link*/

    app.controller('prmServiceLinksAfterController', ['$scope', function ($scope) {
        var vm = this;
        vm.$onInit = function () {
            angular.forEach(vm.prmServiceLinksCtrl.recordLinks, function (value, key) {
                if (value.linkURL.indexOf("search.proquest.com") >= 0) {
                    value.linkURL = value.linkURL + "?accountid=12826";
                }
            });
        };
    }]);

    /*add google analytics*/
    app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
        $window.ga('create', '', 'auto');
        $rootScope.$on('$locationChangeSuccess', function (event) {
            $window.ga('send', 'pageview', {location: $location.url()});
        });
    }]);
    /*end add google anlytics*/

})();