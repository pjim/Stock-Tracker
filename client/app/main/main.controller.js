'use strict';

angular.module('stockTrackerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {


        var stockCallParams = '{"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"GOOG","Type":"price","Params":["c"]}]}'

        var stockData = {};



        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            series: [],
            title: {
                text: 'Your Stocks\'s Recent Performance'
            },

            loading: false
        } ;

                var stockCall = $http.post('/stockcall',{stockOb:stockCallParams}).success(function(data){
                  stockData = data;
                   var dataOb = angular.fromJson(data);
                    var stockName = dataOb.Elements[0].Symbol;
                    var stockPrices = dataOb.Elements[0].DataSeries.close.values;
                    console.log(stockPrices);
                  $scope.chartConfig.series.push({name:stockName,data:stockPrices});

              });
  });



//note the successful example below uses quotes

var anotherExampleCall = {"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}


var newExample = {"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"GOOG","Type":"price","Params":["c"]}]} //note without c returned nothing of use
