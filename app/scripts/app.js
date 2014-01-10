/*global chrome:false */
'use strict';

angular.module('contactListManager', [
  'ngAnimate',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider,$logProvider) {
    $logProvider.debugEnabled(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'userctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('translate', function() {
    return function(input) {
      return  chrome.i18n.getMessage( input );
    };
  })
  .filter('mostraUserOnline',function(){
    return function(items, ifonline){
      if( !ifonline){
        return items;
      }
      else{
        var res = [];
        for( var i = 0; i < items.length; i++){
          if( items[i].online){
            res.push(items[i]);
          }
        }
        return res;
      }
    };
  });
