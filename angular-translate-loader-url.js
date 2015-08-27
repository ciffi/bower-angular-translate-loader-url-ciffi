/*!
 * angular-translate - v2.5.2 - 2014-12-10
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate')
/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateUrlLoader
 * @requires $q
 * @requires $http
 *
 * @description
 * Creates a loading function for a typical dynamic url pattern:
 * "locale.php?lang=en_US", "locale.php?lang=de_DE", "locale.php?language=nl_NL" etc.
 * Prefixing the specified url, the current requested, language id will be applied
 * with "?{queryParameter}={key}".
 * Using this service, the response of these urls must be an object of
 * key-value pairs.
 *
 * @param {object} options Options object, which gets the url, key and
 * optional queryParameter ('lang' is used by default).
 */
.factory('$translateUrlLoader', ['$rootScope','$q', '$http', function ($rootScope, $q, $http) {

  return function (options) {

    if (!options || !options.url) {
      throw new Error('Couldn\'t use urlLoader since no url is given!');
    }

    var deferred = $q.defer(),
        requestParams = {};

    requestParams[options.queryParameter || 'lang'] = options.key;

    $http(angular.extend({
      url: options.url,
      //params: requestParams,
      method: 'GET'
    }, options.$http)).success(function (data) {
      $rootScope.$broadcast('translation__downloaded');
      deferred.resolve(data);
    }).error(function (data) {
      deferred.reject(options.key);
    });

    return deferred.promise;
  };
}]);
