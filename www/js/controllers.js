angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $stateParams, $location) {
    $scope.menu = function(link){
        $location.path(link);
    };
})
.controller('AboutCtrl', function ($scope, $stateParams, $http) {})
.controller('SterlingCtrl', function ($scope, $stateParams, $ionicPopup) {
    $scope.results = {
        day: {},
        hour: {}
    };
    $scope.calculator = {
        hours: 38,
        nicersPercentage: 13.8,
        nationalInsuranceThreshold: 153,
        holidayPayRatePercentage: 12.07,
        PensionRate: 1,
        markupType: '',
        pensionThreshold: 111,
        holiday: 28
    };
    $scope.convert = function (percentage) {
        percentage = percentage / 100;
        return percentage;
    };
    $scope.clear = function () {
        $scope.calculator.payRate = null;
        $scope.calculator.markup = null;
        $scope.results.hour.charge = null;
        $scope.calculator.GP = null;
    };
     $scope.showAlert = function(title, text) {
           var alertPopup = $ionicPopup.alert({
             title: title,
             template: text
           });
         };
    $scope.calculate = function () {
        if ($scope.calculator.payRate < 6.50){
            $scope.showAlert('ERROR', 'Pay rate must be above the national minimum wage, performing calculation at national minimum wage...');
            $scope.calculator.payRate = 6.50;
        }
        if ($scope.calculator.holiday < 28){
            $scope.showAlert('ERROR', 'Holday must be more than 28 days each month, performing calculation with 28 days...');
            $scope.calculator.holiday = 28;
        }
        $scope.calculator.holidayPayRatePercentage = $scope.calculator.holiday / (260 - $scope.calculator.holiday);

        // calculate Pay / Day
        $scope.results.day.pay = $scope.calculator.hours * $scope.calculator.payRate;

        // calculate NIC'Ers / Day
        var nicersDay = $scope.results.day.pay - 153;
        nicersDay = nicersDay * $scope.convert(13.8);
        if (nicersDay < 0) {
            console.log('adjusting nicersDay to be greater than 0');
            nicersDay = 0;
        }
        $scope.results.day.nicers = nicersDay;

        // calculate WTD / Day
        $scope.results.day.wtd = ($scope.results.day.nicers + $scope.results.day.pay) * $scope.calculator.holidayPayRatePercentage;

        // calculate Pension / Day
        var pensionDay = $scope.results.day.pay + $scope.results.day.nicers + $scope.results.day.wtd;
        $scope.results.day.pension = pensionDay * $scope.convert(1);

        //calculate Cost / Day
        var costDay = $scope.results.day.pay + $scope.results.day.nicers + $scope.results.day.wtd + $scope.results.day.pension;
        $scope.results.day.cost = costDay;

        // calculate Pay / Hour
        $scope.results.hour.pay = $scope.results.day.pay / $scope.calculator.hours;

        // calculate NIC'Ers / Hour
        $scope.results.hour.nicers = $scope.results.day.nicers / $scope.calculator.hours;

        // calculate WTD / Hour
        $scope.results.hour.wtd = $scope.results.day.wtd / $scope.calculator.hours;

        // calculate Pension / Hour
        $scope.results.hour.pension = $scope.results.day.pension / $scope.calculator.hours;

        // calculate Cost / Hour
        $scope.results.hour.cost = $scope.results.day.cost / $scope.calculator.hours;

        // calculate Charge / Hour
        $scope.results.hour.charge = $scope.results.hour.cost + $scope.calculator.markup;

        // Calculate Charge / Day
        $scope.results.day.charge = $scope.results.hour.charge * $scope.calculator.hours;

        // Calculate Margin / Day
        $scope.results.day.margin = $scope.results.day.charge - $scope.results.day.cost;

        $scope.calculator.GP = $scope.calculator.markup / $scope.results.hour.charge;
        $scope.calculator.GP = $scope.calculator.GP * 100;
    };
})

.controller('PercentageCtrl', function ($scope, $stateParams) {
    $scope.results = {
        day: {},
        hour: {}
    };
    $scope.calculator = {
        hours: 38,
        nicersPercentage: 13.8,
        nationalInsuranceThreshold: 153,
        holidayPayRatePercentage: 12.07,
        PensionRate: 1,
        markupType: '',
        pensionThreshold: 111,
        holiday: 28
    };
    $scope.toggle = function () {
        $scope.toggleDetail = !$scope.toggleDetail;
    };
    $scope.convert = function (percentage) {
        percentage = percentage / 100;
        return percentage;
    };
    $scope.clear = function () {
        $scope.calculator.payRate = null;
        $scope.calculator.markup = null;
        $scope.results.hour.charge = null;
        $scope.results.hour.margin = null;
    };
    $scope.calculate = function () {

        if ($scope.calculator.holiday < 28){
            alert('Holday must be more than 28 days each month, performing calculation with 28 days...');
            $scope.calculator.holiday = 28;
        }

        $scope.calculator.holidayPayRatePercentage = $scope.calculator.holiday / (260 - $scope.calculator.holiday);

        // calculate Pay / Day
        $scope.results.day.pay = $scope.calculator.hours * $scope.calculator.payRate;

        // calculate NIC'Ers / Day
        var nicersDay = $scope.results.day.pay - 153;
        nicersDay = nicersDay * $scope.convert(13.8);
        if (nicersDay < 0) {
            nicersDay = 0;
        }
        $scope.results.day.nicers = nicersDay;

        // calculate WTD / Day
        $scope.results.day.wtd = ($scope.results.day.nicers + $scope.results.day.pay) * $scope.calculator.holidayPayRatePercentage;

        // calculate Pension / Day
        var pensionDay = $scope.results.day.pay - $scope.calculator.pensionThreshold;
        $scope.results.day.pension = pensionDay * $scope.convert(1);

        //calculate Cost / Day
        var costDay = $scope.results.day.pay + $scope.results.day.nicers + $scope.results.day.wtd + $scope.results.day.pension;
        $scope.results.day.cost = costDay;

        // calculate Pay / Hour
        $scope.results.hour.pay = $scope.results.day.pay / $scope.calculator.hours;

        // calculate NIC'Ers / Hour
        $scope.results.hour.nicers = $scope.results.day.nicers / $scope.calculator.hours;

        // calculate WTD / Hour
        $scope.results.hour.wtd = $scope.results.day.wtd / $scope.calculator.hours;

        // calculate Pension / Hour
        $scope.results.hour.pension = $scope.results.day.pension / $scope.calculator.hours;

        // calculate Cost / Hour
        $scope.results.hour.cost = $scope.results.day.cost / $scope.calculator.hours;

        // calculate Charge / Hour
        var decimal = 1 - $scope.convert($scope.calculator.markup);
        console.log(decimal);
        $scope.results.hour.charge = $scope.results.hour.cost / decimal;

        // Calculate Charge / Day
        $scope.results.day.charge = $scope.results.hour.charge * $scope.calculator.hours;

        // Calculate Margin / Day
        $scope.results.day.margin = $scope.results.day.charge - $scope.results.day.cost;

        $scope.results.hour.margin = $scope.results.hour.charge - $scope.results.hour.cost;

    };
});