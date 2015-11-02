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
            series: [{
                data:[7,1,5,3]
            },
          {
            data:[5,3,5,3]
          }],
            title: {
                text: 'Your Stocks\'s Recent Performance'
            },

            loading: false
        } ;

                var stockCall = $http.post('/stockcall',{stockOb:stockCallParams}).success(function(data){
                  stockData = data;
                   var dataOb = angular.fromJson(data);
                  console.log(dataOb.Positions)

                  $scope.chartConfig.series.push({data:dataOb.Positions});

              });
  });



//note the successful example below uses quotes

var anotherExampleCall = {"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}


var newExample = {"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"GOOG","Type":"price","Params":["c"]}]} //note without c returned nothing of use
