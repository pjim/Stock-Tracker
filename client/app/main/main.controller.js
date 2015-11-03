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

      var charts = $scope.chartConfig.series;
      $scope.buttons = [];

      $scope.removeBut = function(element){
        console.log('removing' + element);
        console.log(charts)
        $scope.chartConfig.series = $scope.chartConfig.series.filter(function(ele){
              console.log(ele.name);
              console.log(element)

             if(ele.name === element){return false}
             else{return true}
        });
        //charts = [];
        console.log(charts);
        console.log($scope.chartConfig.series);
          var butLoc = $scope.buttons.indexOf(element);
        $scope.buttons.splice(butLoc,1);
      }

      //error it always removes the last entry in chart config array

       //make an array search that can find a stock to be deleted


       //implement an removal button - places the stock into the view with a removal buttons
       //removal button uses the name of the stock to use the array search
       //cull the offending item

        //
        // var stockCall = $http.post('/stockcall',{stockOb:stockCallParams}).success(function(data){
        //            var dataOb = angular.fromJson(data);
        //             var stockName = dataOb.Elements[0].Symbol;
        //             var stockPrices = dataOb.Elements[0].DataSeries.close.values;
        //             console.log(stockPrices);
        //           $scope.chartConfig.series.push({name:stockName,data:stockPrices});
        //
        //       });


     var numberStocksTracked = 0;



       $scope.trackStock = function(){
         event.preventDefault();
         var stockSymbol = $scope.stoctrack;
         stockSymbol = stockSymbol.toUpperCase();
         var stockCallParams = '{"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"' + stockSymbol + '","Type":"price","Params":["c"]}]}';

          var stockCall = $http.post('/stockcall',{stockOb:stockCallParams}).success(function(data){
            var dataOb = angular.fromJson(data);
             var stockName = dataOb.Elements[0].Symbol;
             var stockPrices = dataOb.Elements[0].DataSeries.close.values;
            charts.push({name:stockName,data:stockPrices});
            console.log($scope.chartConfig.series);
            $scope.buttons.push(stockName);

       });

      }

  });
