'use strict';

angular.
  module('core.xmlParser').
  factory('XMLParser', ['$resource',
    function($resource) {
      console.log("xml parser called!");
      return {
        parse: function parseXML(file) {
          console.log("TODO: implement the xml parser");
        }
      };
      /*
      return $resource('phones/:phoneId.json', {}, {
        query: {
          method: 'GET',
          params: {phoneId: 'phones'},
          isArray: true
        }
      });
      */
    }
  ]);
