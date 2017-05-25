'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('register service', function() {
  it('registered the registers service', () => {
    assert.ok(app.service('registers'));
  });
});
