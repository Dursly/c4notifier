'use strict';
describe('filter', function() {
	beforeEach(module('contactListManager'));
	describe('mostraUserOnline', function() {

		it('Fake test 1',
			inject(function(){
				expect(true).toBe(true);
				expect(1).toBe(1);
				expect(null).toBe(null);
				expect([1,2,3]).toEqual([1,2,3]);
				expect({object:1}).toEqual({object:1});
			})
		);
		it('Should return void array for an array of offline contacts',
			inject(function(mostraUserOnlineFilter){
				var res = [{nome:'1', online: false},{nome:'1', online:false}];
				expect(mostraUserOnlineFilter(res,true)).toEqual([]);
			})
		);
		it('should return one item',
			inject(function(mostraUserOnlineFilter){
				var res = [{nome:'1',online:false},
					{nome:'2', online:true}];
				dump(mostraUserOnlineFilter(res, true));
				expect(mostraUserOnlineFilter(res, true))
					.toEqual([res[1]]);
			})
		);

		it('should return all items',
			inject(function(mostraUserOnlineFilter){
				var res = [{nome:'1', online: false},{nome:'2', online:true}];
				expect(mostraUserOnlineFilter(res,false)).toBe(res);
			})
		);
	});
});
