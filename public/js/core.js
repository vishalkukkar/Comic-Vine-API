var app = angular.module('app', ['ngResource']);
app.factory('resources', function($resource,$location) {

  var url = $location.absUrl().split('/');
  var characterID = url[url.length - 1];

  var mainID = url[url.length - 3];
  var versusID = url[url.length - 1];

  console.log("MAIN ID" +mainID);
  console.log("CHALLENGER ID" +versusID);
  
  var factory = {};

  factory.routes = {
    characterAPI: $resource('/character/:action', {}, {
      fetch: {method: 'GET', params: {name: '@name', action:'search'}, isArray: true },
      details: {method: 'GET', params: {id: characterID, action: 'details'}, isArray: false },
      versus: {method: 'GET', params: {main: mainID, challenger: versusID, action: 'versus'}, isArray: false }
    
    })
  };

  return factory;
});

app.controller('characterController', function($scope, resources) {

  $scope.changeCharacters=function(a)
  {
    $scope.character.character=a;
  }
  $scope.searchCharacters = function() {
    resources.routes.characterAPI.fetch({name: $scope.name}, function done(response) {
      console.log("response -----"+response.length+"-----");
          
          if(response.length>0)
          {
            $scope.character = {character: response[0], alternatives: response};
          }
          else
          {
            $scope.character = response;
          }

    });
  };


  $scope.toggleReview = function(id) {
    if ($scope.displayReview) {
      console.log('display')
      $scope.reviewBtnText = '+ show review';
      $scope.displayReview = false;
    }
    else {
      console.log('hide')
      if (!$scope.reviews) {
        resources.routes.movieAPI.review({id: id}, function done(response) {
          $scope.reviews = response.reviews;
        });
      }
      // handle buttons
      $scope.reviewBtnText = '- hide review';
      $scope.displayReview = true;
    }
  };

});

app.controller('characterDetailController', function($scope, resources) {

$scope.changemyCharacters=function(newcharacter)
  {
    $scope.character=newcharacter;
    console.log("in changemyCharacters"+newcharacter)
  }

  function init() {
    resources.routes.characterAPI.details(function done(response) {
        console.log("RESPONSE is" + response+"<----------")
        $scope.character = response;
        console.log("SCOPE" + $scope.character)
    });
  }
  init();

  $scope.toggleCast = function() {
    if ($scope.displayCast) {
      $scope.castBtnText = '+ show enemies';
      $scope.displayCast = false;
    }
    else {
      $scope.castBtnText = '- hide enemies';
      $scope.displayCast = true;
    }
  };

  $scope.toggleCast1 = function() {
    if ($scope.displayCast1) {
      $scope.castBtnText1 = '+ show friends';
      $scope.displayCast1 = false;
    }
    else {
      $scope.castBtnText1 = '- hide friends';
      $scope.displayCast1 = true;
    }
  };

  $scope.toggleCast2 = function() {
    if ($scope.displayCast2) {
      $scope.castBtnText2 = '+ show powers';
      $scope.displayCast2 = false;
    }
    else {
      $scope.castBtnText2 = '- hide powers';
      $scope.displayCast2 = true;
    }
  };

});


app.controller('versusController', function($scope, resources) {

  function init() {
    resources.routes.characterAPI.versus(function done(response) {  

        // Main

        if(response.mainDetail.powers.length > 0){
          console.log("in main");
          $scope.characterpowers = [];
          var i=0;
          var temp=0;
          if(response.mainDetail.powers.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.mainDetail.powers.length;
          }

          while(i<temp){
               $scope.characterpowers.push(response.mainDetail.powers[i]);
               i++;
          }
        }
        
        if(response.mainDetail.teams.length > 0){
          $scope.characterteams = [];
          var i=0;
           var temp=0;
          if(response.mainDetail.teams.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.mainDetail.teams.length;
          }
          while(i<temp){
               $scope.characterteams.push(response.mainDetail.teams[i]);
               i++;
          }
        }

        if(response.mainDetail.character_friends.length > 0){
          $scope.characterfriends = [];
           var temp=0;
          if(response.mainDetail.character_friends.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.mainDetail.character_friends.length;
          }
          var i=0;
          while(i<temp){
               $scope.characterfriends.push(response.mainDetail.character_friends[i]);
               i++;
          }
        }

        if(response.mainDetail.character_enemies.length > 0){
          $scope.characterenemies = [];
          var temp=0;
          if(response.mainDetail.character_enemies.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.mainDetail.character_enemies.length;
          }
          var i=0;
          while(i<temp){
               $scope.characterenemies.push(response.mainDetail.character_enemies[i]);
               i++;
          }
        }

        // Challenger

        if(response.challengerDetail.powers.length > 0){
          console.log("in challanger");
          $scope.characterchallengerpowers = [];
          var temp=0;
          if(response.challengerDetail.powers.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.challengerDetail.powers.length;
          }
          for(var i=0 ; i<temp ; i++){
               $scope.characterchallengerpowers.push(response.challengerDetail.powers[i]);
               console.log($scope.characterchallengerpowers);
          }
        }

        if(response.challengerDetail.teams.length > 0){
          $scope.characterchallengerteams = [];
          var temp=0;
          if(response.challengerDetail.teams.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.challengerDetail.teams.length;
          }
          for(var i=0 ; i<temp ; i++){
               $scope.characterchallengerteams.push(response.challengerDetail.teams[i]);
          }
        }

        if(response.challengerDetail.character_friends.length > 0){
          $scope.characterchallengerfriends = [];
          var temp=0;
          if(response.challengerDetail.character_friends.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.challengerDetail.character_friends.length;
          }
          for(var i=0 ; i<temp ; i++){
               $scope.characterchallengerfriends.push(response.challengerDetail.character_friends[i]);
          }
        }

        if(response.challengerDetail.character_enemies.length > 0){
          $scope.characterchallengerenemies = [];
          var temp=0;
          if(response.challengerDetail.character_enemies.length > 10)
          {
          var temp=10;
          }
          else
          {
            var temp=response.challengerDetail.character_enemies.length;
          }
          for(var i=0 ; i<temp ; i++){
               $scope.characterchallengerenemies.push(response.challengerDetail.character_enemies[i]);
          }
        }


        $scope.character = response;
        console.log("Scope : " + $scope.character);
    });
  }

  init();

});