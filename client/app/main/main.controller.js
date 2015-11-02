'use strict';

angular.module('stockTrackerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

        var stockCallParams = {"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"GOOG","Type":"price","Params":["c"]}]}

        var stockData = {};


        var stockCall = $http.jsonp('http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp?parameters=' + stockCallParams + '&callback=JSON_CALLBACK', ).success(function(data){
          console.log(data);
          stockData = data;
        })
        console.log(stockData);
        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            series: [{
                data: stockData
            }],
            title: {
                text: 'Your Stocks\'s Recent Performance'
            },

            loading: false
        } ;

  });



//note the successful example below uses quotes

var anotherExampleCall = {"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}


var newExample = {"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"GOOG","Type":"price","Params":["c"]}]} //note without c returned nothing of use
