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

      $scope.buttons = [];

      $scope.removeBut = function(element){
        console.log('removing' + element);
        console.log(charts)
        $scope.chartConfig.series = $scope.chartConfig.series.filter(function(ele){

             if(ele.name === element){return false}
             else{return true}
        });
        console.log($scope.chartConfig.series);
          var butLoc = $scope.buttons.indexOf(element);
        $scope.buttons.splice(butLoc,1);
      }


      //error you cannot reinsert a removed stock without a page refresh

     $scope.resetTracking = function(){
       $scope.buttons = [];
       $scope.chartConfig.series = [];
     }



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
          $scope.chartConfig.series.push({name:stockName,data:stockPrices});
            console.log($scope.chartConfig.series);
            $scope.buttons.push(stockName);

       });

      }

  });
