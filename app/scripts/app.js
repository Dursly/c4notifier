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
  })
  .filter('myFilter', function(){
    return function(items,text){
      if(typeof text === 'undefined'){
        return items;
      }
      if( text === ''){
        return items;
      }
      else{
        var res = [];
        console.log('Testo da cercare: ' + text);
        for( var i = 0; i < items.length; i++){
          console.log(items[i].nome);
          if( items[i].nome.indexOf(text) != -1 ){
            res.push(items[i]);
          }
        }
        console.log(res.length);
        return res;
      }   
    }
  });
