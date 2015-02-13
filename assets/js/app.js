var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'templates/fruit-index.html',
            controller: 'fruithomeCtrl'
          }).
         when('/contact', {
            templateUrl: 'templates/fruit-contactus.html',
            controller: 'fruitcontactcontroller'
          }).
          when('/fruits', {
            templateUrl: 'templates/fruit-list.html',
            controller: 'fruitlistcontroller'
          }).
        
          otherwise({
            redirectTo: '/'
          });
      });
myApp.controller('fruitlistcontroller', ['$scope', '$http', function($scope, $http){    
  $scope.myOptions = ['1', '2', '3','4','5','6','7','8','9','10']; 
    $http.get('json/fruits.json').success(function(data) {
      $scope.fruititems = data;
    });
  
 
 $scope.selection=[];
 $scope.selectedquantity=[];
  // toggle selection for a given fruit by name
  $scope.toggleSelection = function toggleSelection(selectedfruitname) {  
      var idx = $scope.selection.indexOf(selectedfruitname);
       if (idx > -1) {
       $scope.selection.splice(idx, 1);
       //console.log($scope.selection);
     } else {
       $scope.selection.push(selectedfruitname);
     }
    if ($('.dropdowntoggle').is(':checked')) {
       $('#selecteditem').css('display', 'block');
    }else{
       $('#selecteditem').css('display', 'none');
    }
     if ($('#'+selectedfruitname).is(':checked')) {
         $("#selectquan_"+selectedfruitname).removeAttr('disabled');
    } else {
        $("#selectquan_"+selectedfruitname).not(this).val('');
        $("#totalprice_"+selectedfruitname).html("");
        $("#selectquan_"+selectedfruitname).attr('disabled','disabled');
        console.log("id"+idx);console.log("selectedquantity",$scope.selectedquantity);
        $scope.selectedquantity.splice(idx, 1);  
      return this.defaultSelected;
    } 
   };
   $scope.onselectitem = function onselectitem(name,rupees) {
    var selectedval=$("#selectquan_"+name).val();
    var selectedtext=$( "#selectquan_"+name+" option:selected" ).text();
     if(selectedtext!='select quantity'){
              var cost=parseInt(selectedtext)*parseInt(rupees);
              if (selectedval){
                $("#totalprice_"+name).css('display', 'block');
              } else{
                $("#totalprice_"+name).css('display', 'none');
              }    
              $scope.selectedquantity.push({"name":name,"value":selectedtext,"cost":cost});
         }
  }

   $scope.getTotal = function(){
       var total = 0;
       for (var i = 0; i < $scope.selectedquantity.length; i++) {
              total = parseInt(total) + parseInt($scope.selectedquantity[i].cost);
            }
       return total;
  }
 function resetItem(){ 
   $scope.fruits = { 
      username : '', 
      address : '',
      phoneno : '',
      items  :  '',
      id : '' 
   };             
   $scope.displayForm = ''; 
   
} 
  
resetItem(); 
 
 $scope.addItem = function () { 
   resetItem(); 
   $scope.displayForm = true; 
 } 
  
$scope.saveItem = function () { 
  var userdetails = $scope.fruits; 
  var selecteditems=$scope.selectedquantity;
      var obj=JSON.stringify(selecteditems);
      var newObject = JSON.parse(obj);
      console.log("obj",obj);
      console.log("newo",newObject);
  
 
    if (userdetails.id.length === 0){ 
      $http.get('/fruits/create?username=' + userdetails.username + '&address=' +  userdetails.address+ '&phoneno=' +  userdetails.phoneno+ '&items=' +  obj).success(function(data) { 
              $scope.items.push(data); 
              $scope.displayForm = ''; 
              removeModal(); 
              enablenewmodel();           
            }). 
        error(function(data, status, headers, config) { 
          alert(data.summary); 
        });     
      }else{ 
        $http.get('/fruits/update/'+ userdetails.id +'?username=' + userdetails.username + '&address=' +  userdetails.address+ '&phoneno=' +  userdetails.phoneno+ '&items=' +  selecteditems ).success(function(data) { 
          alert("Thanks for ordering");
          $scope.displayForm = ''; 
          removeModal(); 
        }). 
        error(function(data, status, headers, config) { 
          alert(data.summary); 
        }); 
      } 
 }; 

  $http.get('/fruits/find').success(function(data) { 
    for (var i = 0; i < data.length; i++) { 
      data[i].index = i; 
    } 
    $scope.items = data; 
  }); 

 function removeModal(){ 
    $('.modal').modal('hide');         
  }
   function enablenewmodel(){ 
    $('#newmodel').modal('show'); 
     //setTimeout(function(){ window.location.reload(); }, 2000);
     $scope.selectedquantity='';
     $scope.selection='';
     
  }
  }]); 

myApp.service('sharedProperties', function () {
        var property = 'Firstval';
         this.selection = function() {
              return this.selection;
        };
        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });
myApp.controller('fruithomeCtrl', ['$scope', '$routeParams','sharedProperties',
  function($scope, $routeParams,sharedProperties) {
   $scope.both = sharedProperties.getProperty();
   console.log($scope.both);
  }]);
myApp.controller('fruitcontactcontroller', ['$scope', '$routeParams','sharedProperties',
  function($scope, $routeParams,sharedProperties) {
   $scope.both = sharedProperties.getProperty();
   console.log($scope.both);
  }]);

