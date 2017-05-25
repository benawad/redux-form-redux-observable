'use strict';

// src/services/register/hooks/validation.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    if (hook.data.firstName === hook.data.lastName) {
      throw new errors.BadRequest('Invalid Parameters', {errors: {lastName: 'Last name has to be different than first name'} });
    }
    hook.validation = true;
  };
};
