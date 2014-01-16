/*global chrome:false */
/*global navigator:false */
/*jshint loopfunc: true */

'use strict';

angular.module('contactListManager')
	.controller('ModalRemoveCtrl',['$scope','$modalInstance','contact', function ($scope, $modalInstance, contact) {
		$scope.nome = contact.nome;
		$scope.remove = function () {
			$modalInstance.close(contact.indexm);
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}])
	.controller('userctrl', ['$scope','$http','$log','$interval','$modal','$window',function ($scope, $http, $log, $interval,$modal,$window) {
	$scope.items =[];
	$scope.online = navigator.onLine;
	$scope.newItem = {
		nome: '',
		online: false,
		invalid: false
	};
	$scope.viewOnline= false;
	$scope.popup = false;
	$scope.refreshTime = 30000;

	$interval(function(){
		$scope.refresh();
	},$scope.refreshTime);

	$scope.addModel = function(){
		$log.debug('Aggiungo utente');
		var pattern = /[A-Za-z0-9_-]+/;
		var patternURL = new RegExp('(http|https):\\/\\/(\\w+)\\.cam4(\\.\\w+)+\\/(\\w+)');
		//Validate username
		var urlUserName = $scope.newItem.nome.match(patternURL);
		$log.debug(urlUserName);
		if(urlUserName !== null ){
			var username = urlUserName[4];
			$log.debug(urlUserName);
			$log.debug('Riconosciuto URL, username:' + username);
			$scope.items.push({
				nome: username,
				online: false
			});
			$scope.newItem.nome ='';
			saveUsers();
			$scope.refresh();
		}
		else if( pattern.test($scope.newItem.nome)){
			$log.debug('Riconosciuto username Valido');
			$scope.items.push({
				nome: $scope.newItem.nome,
				online: false
			});
			$scope.newItem.nome ='';
			saveUsers();
			$scope.refresh();
		}
		else{
			$log.debug('Nome utente inserito non valido: resetto campo username');
			$scope.newItem.nome ='';
		}

	};

	$scope.changePopUpStatus = function(){
		$scope.popup = !$scope.popup;
		chrome.storage.sync.set({popup: $scope.popup});
	};

	$scope.removeModel = function( model){
		$scope.items.splice(model,1);
		saveUsers();
	};

	$scope.notifyShowTime = 10000;

	var notifyUserOnline = function(user){
		if($scope.popup === true){
			chrome.notifications.create(user,{
				type: 'basic',
				title: 'C4Notifier',
				message: user + chrome.i18n.getMessage('eonline'),
				iconUrl: 'icon.png',
				buttons: [
					{
						title:'Apri',
						iconUrl:'icon.png'
					}
				]
			},function(){});
			$window.setTimeout(function(){chrome.notifications.clear(user,function(){});}, $scope.notifyShowTime);
			chrome.notifications.onClicked.addListener(function( notificationId){
				$window.open('http://www.cam4.com/'+notificationId,'_blank');
				chrome.notifications.clear(user,function(){});
			});
		}
	};

	var getUsersArray = function(){
		var res = [];
		for( var i in $scope.items){
			res.push($scope.items[i].nome);
		}
		return res;
	};
	var changeOnLineStatus = function(){
		$scope.online= navigator.onLine;
	};

	var saveUsers = function(){
		chrome.storage.sync.set({users: getUsersArray()});
	};

	var loadUsers = function(){
		$scope.items = [];
		chrome.storage.sync.get('users',function(res){
			$log.debug(res);
			while(res.users.length){
				$scope.items.push({nome:res.users.pop(), online: false});
			}
			$scope.refresh();
		});
	};

	$scope.refresh = function(){
		$log.debug($scope.items);
		for( var m =0; m < $scope.items.length; m++){
			if($scope.online){
				(function f(i){
					$http.get('http://www.cam4.com/direct?room='+$scope.items[i].nome).success(function(data) {
						$log.debug(data);
						if(data.substring(0,7) === 'rtmp://'){
							if($scope.items[i].online === false){
								notifyUserOnline($scope.items[i].nome);
							}
							$scope.items[i].online = true;
							$log.debug($scope.items[i].nome + ' è online');
						}
						else if(data.substring(0,7) === 'invalid'){
							$scope.items[i].online = false;
							$scope.items[i].invalid = true;
						}
						else{
							$log.debug($scope.items[i].nome +' è offline');
							$scope.items[i].online = false;
						}
					});
				})(m);
			}
			else{ //Applicazione Offline
				$scope.items[m].online = false;
			}
		}
	};
	$scope.getIndexItem = function (itemName){
		for( var i in $scope.items){
			if( itemName === $scope.items[i].nome){
				return parseInt(i);
			}
		}
		$log.error('Modello non trovato nella lista:' + itemName);
		return -1;
	};

	$scope.modalRequestRemoveModel = function(modelName){
		$log.debug('modalRequestRemoveModel called!');
		var modalInstance = $modal.open({
			templateUrl: 'confermaRemove.html',
			controller: 'ModalRemoveCtrl',
			resolve: {
				contact: function () {
					return {nome:modelName, indexm: $scope.getIndexItem(modelName)};
				}
			}
		});

		modalInstance.result.then(function (ind) {
			$scope.removeModel(ind);
		});
	};

	/*Locale support*/
	$scope.translate = function(msgid){
		$log.debug('Traduco: '+chrome.i18n.getMessage( msgid ));
		return chrome.i18n.getMessage( msgid );
	};

	$scope.changeViewOnline = function(){
		$scope.viewOnline = !$scope.viewOnline;
		chrome.storage.sync.set({
			viewOnline: $scope.viewOnline
		});
	};
	
	var notificationBtnClick = function(notID){
		window.open('http://www.cam4.com/'+notID,'_blank');
	};


	//*****************Costruttore*********************//
	$scope.init = function(){
		$scope.addCollapsed = true;
		chrome.notifications.onButtonClicked.addListener(notificationBtnClick);
		chrome.storage.sync.get(['popup','viewOnline'],function(res){
			if( res !== null){
				if(res.popup !== null){
					$scope.popup = res.popup;
				}
				if(res.viewOnline !== null){
					$scope.viewOnline = res.viewOnline;
				}
			}
		});

		loadUsers();

		$window.addEventListener('online',  changeOnLineStatus);
		$window.addEventListener('offline',  changeOnLineStatus);
		$log.debug('Init completato!');
	};
}]);

