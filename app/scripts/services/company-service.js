'use strict';

/**
 * @ngdoc service
 * @name stockdogApp.CompanyService
 * @description
 * # CompantyService
 * Service in the stockdogApp.
 */
angular.module('stockdogApp')
  .service('CompanyService', function CompanyService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('companies.json');
  });
