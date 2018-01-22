'use strict';

angular.
  module('core.validationService').
  factory('ValidationService', ['$sce',
    function($sce) {
      return {
        validate: function validate(data) {
          // response will be an array with each element having the transaction reference and the validation status
          var response = [];

          // creating the data structure to hold the unique transaction reference
          // I choose the SortedSet backed by a red-black-tree because it is very efficient
          // for insertions and to find a specific element (contains). Both operations happen
          // at O(lgn).
          var transactionSet = new SortedSet({ strategy: SortedSet.RedBlackTreeStrategy });

          for (var i = 1; i < data.length; i++) {
            // read from the second line on, since the first one is the header
            var line = data[i];
            var msg = "";
            //line[0] is the transaction reference, must be number and unique over all file
            if (isNaN(line[0])) {
              msg += "ERR: Transaction reference " + line[0] + " is not a number!";
            } else {
              // verify if the transaction is already in the set
              var transactionReference = Number(line[0]);
              if (transactionSet.contains(transactionReference)) {
                if (msg.length > 0) {
                  msg += "<hr class='line-separator'/>";
                }
                msg += "ERR: Transaction reference " + line[0] + " is not unique!";
              } else {
                transactionSet.insert(transactionReference);
              }
            }
            //line[3] is the start balance, must be a number
            if (isNaN(line[3])) {
              if (msg.length > 0) {
                msg += "<hr class='line-separator'/>";
              }
              msg += "ERR: Start balance " + line[3] + " is not a valid number!";
            }
            //line[4] is the mutation, must be a number
            if (isNaN(line[4])) {
              if (msg.length > 0) {
                msg += "<hr class='line-separator'/>";
              }
              msg += "ERR: Mutation " + line[4] + " is not a valid number!";
            }
            //line[5] is the end balance, must be a number and the sum of start balance and mutation
            if (isNaN(line[5])) {
              if (msg.length > 0) {
                msg += "<hr class='line-separator'/>";
              }
              msg += "ERR: End balance " + line[5] + " is not a valid number!";
            } else {
              // since it is a number, let's validate the sum of start balance and mutation
              var sum = Number(line[3]) + Number(line[4]);
              if (!isNaN(line[3]) && !isNaN(line[4])) {
                if ((Number(line[3]) + Number(line[4])).toFixed(2) != Number(line[5])) {
                  if (msg.length > 0) {
                    msg += "<hr class='line-separator'/>";
                  }
                  msg += "ERR: End balance " + line[5] + " is not equal to start balance + mutation (" + sum + ")!";
                }
              }
            }
            if (msg.length == 0) {
              msg = "Valid transaction";
            }
            var responseItem = [];
            responseItem[0] = line[0];
            // Angular needs to trust on the strings that contain HTML tags (in this case, just the
            // line break), so I needed to use the $sce module to do that.
            responseItem[1] = $sce.trustAsHtml(msg);
            response.push(responseItem);
          }
          return(response);
        }
      };
    }
  ]);
