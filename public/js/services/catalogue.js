angular.module('catalogue', [])

	// super simple service
	// each function returns a promise object 
	.factory('Catalogue', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/memes');
			},
			create : function(memeData) {
				return $http.post('/api/memes', memeData);
			},
			delete : function(id) {
				return $http.delete('/api/memes/' + id);
			}
		}
	}]);