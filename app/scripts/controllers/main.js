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
		online: false
	};
	$scope.viewOnline= false;
	$scope.popup = false;

	$interval(function(){
		$scope.refresh();
	},30000);

	$scope.addModel = function(){
		$scope.items.push({
			nome: $scope.newItem.nome,
			online: false
		});
		$scope.newItem.nome ='';
		saveUsers();
		$scope.refresh();
	};

	$scope.changePopUpStatus = function(){
		$scope.popup = !$scope.popup;
		chrome.storage.sync.set({popup: $scope.popup});
	};

	$scope.removeModel = function( model){
		$scope.items.splice(model,1);
		saveUsers();
	};

	var notifyUserOnline = function(user){
		if($scope.popup === true){
			chrome.notifications.create(user,{
				type: 'basic',
				title: 'C4Notifier',
				message: user + ' è online',
				iconUrl: 'icon.png',
				buttons: [
					{
						title:'Apri',
						iconUrl:'icon.png'
					}
				]
			},function(){});
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
				var a = res.users.pop();
				$scope.items.push({nome:a, online: false});
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
						$log.debug($scope.items[i]);
						if(data.substring(0,7) === 'rtmp://'){
							if($scope.items[i].online === false){
								notifyUserOnline($scope.items[i].nome);
							}
							$scope.items[i].online = true;
							$log.debug($scope.items[i].nome + ' è online');
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

	$scope.modalRequestRemoveModel = function(modelIndex){
		$log.debug('modalRequestRemoveModel called!');
		var modalInstance = $modal.open({
			templateUrl: 'confermaRemove.html',
			controller: 'ModalRemoveCtrl',
			resolve: {
				contact: function () {
					return {nome:$scope.items[modelIndex].nome, indexm: modelIndex};
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

