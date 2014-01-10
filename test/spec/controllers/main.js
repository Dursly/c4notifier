'use strict';

describe('Controller: userctrl', function () {

  // load the controller's module
  beforeEach(module('contactListManager'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('userctrl', {
      $scope: scope
    });
  }));

  it('L\'array items dovrebbe essere 0', function () {
    expect(scope.items.length).toBe(0);
  });

  it('Verfico le funzionalità della funzione getIndexItem', function(){
    scope.items = [
      {
        nome: 'cica',
        online: true
      },
      {
        nome: 'bieaabiebabi',
        online: false
      },
      {
        nome: 'c1c2c3c4c5',
        online: true
      }
    ];
    expect( scope.getIndexItem('cica')).toEqual(0);
    expect( scope.getIndexItem('c1c2c3c4c5')).toEqual(2);
    expect( scope.getIndexItem('nonEsistente')).toEqual(-1);

  });
/*
  it('Verifico l\'inserimento degli username', function(){

    var testUserName = [
      'ciao',
      'http://www.cam4.com/prova1',
      'http://it.cam4.com.de/prova2',
      'modella1',
      'prova_3'
    ];
    for( var i = 0; i < testUserName.length; i++){
      scope.newItem.nome = testUserName[i];
      scope.addModel();
      dump(scope.items);
    }
    expect ( scope.items ).toEqual([
      'ciao',
      'prova1',
      'prova2',
      'modella1',
      'prova_3'
    ]);
  });
  /*
  it('Dovrebbe cambiare lo stato viewOnline da false a true', function(){
    scope.viewOnline = false;
    expect(scope.changeViewOnline()).toEqual(true);
  });
  */
});
