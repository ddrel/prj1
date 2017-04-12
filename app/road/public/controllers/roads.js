angular.module('RBIS').controller("roadsCtrl", function( $scope, $http,$rootScope,$window,$timeout,utilities) {
    $scope.roadsCollection = [];
    $scope.paging = {};
    $scope.pagination = {};
    $scope.pagination.max = 1;
    $scope.pagination.current = 1;
    $scope.searchText = "";
    $scope.advancefilterdisplay=0;

    $scope.truncatetext = function(txt){
        return utilities.text.truncate(txt,30);
    }

    $scope.formatToDecimal =  function(d){
        return utilities.formatToDecimal(d);
    }
    

    $scope.getroads = function(qry,cb){
        $http.get("/api/roads/getroadaggmain" + qry).success(function(data){
                cb(data);
        });
    }

    $scope.init = function(){
        $timeout(function(){
                $scope.getroads("",function(response){
                        $scope.roadsCollection = response.data;
                        $scope.pagination.max = response.pagecount;
                        //$scope.pagination.max
                })
        });
    }



    /* Events*/
    $scope.update =  function(road){
        console.log("/road/update/" +  road._id.R_ID);
        //$state.go("/road/update/" +  road._id.R_ID);
        $window.location.href = "/#/road/update/" + road._id.R_ID;
    };

    $scope.onSearch =  function(s){        
        $scope.getroads("?qry=" + s,function(response){
                        $scope.roadsCollection = response.data;
                        $scope.pagination.max = response.pagecount;
                })
    }

    $scope.pageChanged = function(page){
        var _qry = ($scope.searchText!="")? "?qry=" + $scope.searchText + "&page=" + page:"" + "?page=" +page;
        $scope.getroads(_qry,function(response){
                        $scope.roadsCollection = response.data;
                        //$scope.pagination.max
                })

    }
});