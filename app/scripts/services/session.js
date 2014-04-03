'use strict';

angular.module('circeApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
