'use strict';

/**
 * @ngdoc directive
 * @name stockdogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockdogApp')
  // [1] Register directive, inject dependencies
  .directive('stkWatchlistPanel', function ($location, $modal, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function postLink($scope) {

        // [2] Init varialbles
        $scope.watchlist = {};
        var addListModal = $modal({
          scope: $scope,
          templateUrl: 'views/templates/addlist-modal.html',
          show: false
        });

        // [3] Bind model from service
        $scope.watchlists = WatchlistService.query();

        // [4] Display addlist modal
        $scope.showModal = function () {
          addListModal.$promise.then(addListModal.show);
        };

        // [5] Create a new list from fields in modal
        $scope.createList = function () {
          WatchlistService.save($scope.watchlist);
          addListModal.hide();
          $scope.watchlist = {};
        }

        // [6] Delete desired list and redirect to home
        $scope.deleteList = function (list) {
          WatchlistService.remove(list);
          $location.path('/');
        }
      }
    };
  });
