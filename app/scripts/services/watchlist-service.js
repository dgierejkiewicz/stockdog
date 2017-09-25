'use strict';

/**
 * @ngdoc service
 * @name stockdogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockdogApp.
 */
angular.module('stockdogApp')
  .service('WatchlistService', function WatchlistService() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    // [1] Helper: Load watchlists from local storage
    var loadModel = function () {
      var model = {
        watchlists: localStorage['Stockdog.watchlists'] ? JSON.parse(localStorage['Stockdog.watchlists']) : [],
        nextId: localStorage['Stockdog.nextId'] ? parseInt(localStorage['Stockdog.nextId']) : 0,
      }
      return model;
    };

    // [2] Helper: Save watchlists to local storage
    var saveModel = function () {
      localStorage['Stockdog.watchlists'] = JSON.stringify(Model.watchlists);
      localStorage['Stockdog.nextId'] = Model.nextId;
    };

    // [3] Helper: Use lodash to find a watchlist with given ID
    var findById = function (listId) {
      return _.find(Model.watchlists, function (watchlist) {
        return watchlist.id = parseInt(listId);
      });
    };

    // [4] Return all watchlists or find by given ID
    this.query = function (listId) {
      if (listId) {
        return findById(listId);
      } else {
        return Model.watchlists;
      }
    };

    // [5] Save a new watchlist to watchlists model
    this.save = function (watchlist) {
      watchlist.id = Model.nextId++;
      Model.watchlists.push(watchlist);
      saveModel();
    }

    // [6] Remove given watchlist from watchlists model
    this.remove = function (watchlist) {
      _.remove(Model.watchlists, function (list) {
        return list.id === watchlist.id;
      })
    }

    // [7] Initialize model for this singleton service
    var Model = loadModel();

  });
