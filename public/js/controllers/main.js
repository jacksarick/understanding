angular.module('librarian', [])

	// inject the Meme service factory into our controller
	.controller('mainController', ['$scope','$http','Catalogue', function($scope, $http, Catalogue) {
		$scope.formData = {};
		$scope.loading = true;

		// GET
		Catalogue.get()
			.success(function(data) {
				$scope.memes = data;
				$scope.loading = false;
			});

		// CREATE
		// when submitting the add form, send the text to the node API
		$scope.createMeme = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Catalogue.create($scope.formData)

					// if successful creation, call our get function to get all the new memes
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.memes = data; // assign our new list of memes
					});
			}
		};

		// DELETE
		// delete a meme after checking it
		$scope.deleteMeme = function(id) {
			$scope.loading = true;

			Catalogue.delete(id)
				// if successful creation, call our get function to get all the new memes
				.success(function(data) {
					$scope.loading = false;
					$scope.memes = data; // assign our new list of memes
				});
		};
	}]);