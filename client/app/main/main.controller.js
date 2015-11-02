'use strict';

angular.module('stockTrackerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {



        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7]
            }],
            title: {
                text: 'Your Stocks\'s Recent Performance'
            },

            loading: false
        } ;

  });


var exampleMarketCall = {
  Normalized:false,
  StartDate:'2011-03-01T00:00:00-00',
  EndDate:' 2011-06-01T00:00:00-00',
  EndOffsetDays:30,
  NumberOfDays:40,
  DataPeriod:"Week",
  DataInterval:2,
  LabelPeriod:'Week',
  LabelInterval:1,
  Elements:[
    Symbol:'goog',
    Type:'price',
    Params:[]
  ]
}

//note the successful example below uses quotes

var anotherExampleCall = {"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}
}

var newExample = {"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"GOOG","Type":"price","Params":["c"]}]} //note without c returned nothing of use
