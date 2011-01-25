var vows = require('vows'),
    assert = require('assert'),
    _  = require('underscore');
_.mixin(require('../lib/underscore.date'));

vows.describe('date').addBatch({}).export(module);
