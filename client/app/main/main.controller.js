'use strict';

angular.module('stockTrackerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {




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
        $scope.chartConfig.series = $scope.chartConfig.series.filter(function(ele){
             if(ele.name === element){return false}
             else{return true}
        });
        var butLoc = $scope.buttons.indexOf(element);
        $scope.buttons.splice(butLoc,1);
      }

//name the x and y appropriately

     $scope.resetTracking = function(){
       $scope.buttons = [];
       $scope.chartConfig.series = [];
     }

     $scope.areGraphs = function(){
       if($scope.chartConfig.series.length === 0){
         return false;
       }else{return true;}
     }

     var numberStocksTracked = 0;



       $scope.trackStock = function(){
         event.preventDefault();
         var stockSymbol = $scope.stoctrack;
         stockSymbol = stockSymbol.toUpperCase();
         var stockCallParams = '{"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":"' + stockSymbol + '","Type":"price","Params":["c"]}]}';

          var stockCall = $http.post('/stockcall',{stockOb:stockCallParams}).success(function(data){
           try {
                var dataOb = angular.fromJson(data);
            } catch (e) {
              alert('Not a valid stock code')
            }
             var stockName = dataOb.Elements[0].Symbol;
             var stockPrices = dataOb.Elements[0].DataSeries.close.values;
             $scope.chartConfig.series.push({name:stockName,data:stockPrices});
            $scope.buttons.push(stockName);

       });

      }

  });

//  This is the type of formatting required for the api call, other parameters are
//  also available on the Markit site
//'{"Normalized":false,"NumberOfDays":300,"DataPeriod":"Day","Elements":[{"Symbol":' + stockSymbol + ',"Type":"price","Params":["c"]}]}';
