'use strict';

angular.module('circeApp')
  .controller('MainCtrl', function ($scope, ezfb, $window, $location) {
    /*$http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });*/
      console.log("estoy en el MainCtrl");
      
      updateLoginStatus(updateApiMe);

      $scope.login = function(){
	  ezfb.login(function(res){
	      if(res.authResponse){
		  updateLoginStatus(updateApiMe);
	      }
	  }, {scope: 'email,user_likes'});
      };

      $scope.logout = function(){
	  ezfb.logout(function(){
	      updateLoginStatus(updateApiMe);
	  });
      };

      var autoToJSON = ['loginStatus', 'apiMe'];
      angular.forEach(autoToJSON, function(varName){
	  $scope.$watch(varName, function(val){
	      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
	  }, true);
      });

      function updateLoginStatus(more){
	  ezfb.getLoginStatus(function(res){
	      $scope.loginStatus = res;

	      (more || angular.noop)();
	  });
      }

      function updateApiMe(){
	  ezfb.api('/me', function(res){
	      $scope.apiMe = res;
	  });
      }
  });
