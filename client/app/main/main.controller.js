'use strict';

angular.module('stockTrackerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {


        //var stockSymbol = '"GOOG"';
      //  var stockCallParams = '{"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":' + stockSymbol + ',"Type":"price","Params":["c"]}]}';

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
        };

        //
        // var stockCall = $http.post('/stockcall',{stockOb:stockCallParams}).success(function(data){
        //            var dataOb = angular.fromJson(data);
        //             var stockName = dataOb.Elements[0].Symbol;
        //             var stockPrices = dataOb.Elements[0].DataSeries.close.values;
        //             console.log(stockPrices);
        //           $scope.chartConfig.series.push({name:stockName,data:stockPrices});
        //
        //       });






       $scope.trackStock = function(){
         event.preventDefault();
         console.log('track activated')
         var stockSymbol = $scope.stoctrack;
         var stockCallParams = '{"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"' + stockSymbol + '","Type":"price","Params":["c"]}]}';

          var stockCall = $http.post('/stockcall',{stockOb:stockCallParams}).success(function(data){
            var dataOb = angular.fromJson(data);
             var stockName = dataOb.Elements[0].Symbol;
             var stockPrices = dataOb.Elements[0].DataSeries.close.values;
             console.log(stockPrices);
            $scope.chartConfig.series.push({name:stockName,data:stockPrices});

       });

      }

  });
