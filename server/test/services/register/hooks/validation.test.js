'use strict';

const assert = require('assert');
const validation = require('../../../../src/services/register/hooks/validation.js');

describe('register validation hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    validation()(mockHook);

    assert.ok(mockHook.validation);
  });
});
