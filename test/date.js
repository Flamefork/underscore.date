var vows = require('vows'),
    assert = require('assert'),
    _  = require('underscore');

_.mixin(require('../lib/underscore.date'));

vows.describe('date').addBatch({
    'Date object being created by date(y, m, d)': {
        topic: _.date(2011, 1, 25),
        'should be instance of system Date': function (topic) {
            assert.isTrue(topic instanceof Date);
        },
        'should represent proper date': function (topic) {
            assert.equal(topic.getFullYear(), 2011);
            assert.equal(topic.getMonth(), 0);
            assert.equal(topic.getDate(), 25);
            assert.equal(topic.getHours(), 0);
            assert.equal(topic.getMinutes(), 0);
            assert.equal(topic.getSeconds(), 0);
            assert.equal(topic.getMilliseconds(), 0);
        }
    },
    'Date object being created by utc(y, m, d)': {
        topic: _.utc(2011, 1, 25),
        'should be instance of system Date': function (topic) {
            assert.isTrue(topic instanceof Date);
        },
        'should represent proper date in UTC': function (topic) {
            assert.equal(topic.getUTCFullYear(), 2011);
            assert.equal(topic.getUTCMonth(), 0);
            assert.equal(topic.getUTCDate(), 25);
            assert.equal(topic.getUTCHours(), 0);
            assert.equal(topic.getUTCMinutes(), 0);
            assert.equal(topic.getUTCSeconds(), 0);
            assert.equal(topic.getUTCMilliseconds(), 0);
        }
    },
    'Date object': {
        topic: _.date(2001, 2, 3, 4, 5, 6, 7),
        'should support basic strftime features': function (topic) {
            assert.equal(_.strftime(topic, '%Y-%m-%d %H:%M:%S'), '2001-02-03 04:05:06');
        },
        'should support all strftime features': function (topic) {
//            assert.equal(_.strftime(topic, '%A %a %B %b %c'), '');
//            assert.equal(_.strftime(topic, '%A'), '');
//            assert.equal(_.strftime(topic, '%a'), '');
//            assert.equal(_.strftime(topic, '%B'), '');
//            assert.equal(_.strftime(topic, '%b'), '');
            assert.equal(_.strftime(topic, '%C'), '20');
//            assert.equal(_.strftime(topic, '%c'), '');
            assert.equal(_.strftime(topic, '%D'), '02/03/01');
            assert.equal(_.strftime(topic, '%d'), '03');
            assert.equal(_.strftime(topic, '%e'), ' 3');
            assert.equal(_.strftime(topic, '%F'), '2001-02-03');
//            assert.equal(_.strftime(topic, '%G'), '');
//            assert.equal(_.strftime(topic, '%g'), '');
            assert.equal(_.strftime(topic, '%H'), '04');
//            assert.equal(_.strftime(topic, '%h'), '');
            assert.equal(_.strftime(topic, '%I'), '04');
//            assert.equal(_.strftime(topic, '%j'), '');
            assert.equal(_.strftime(topic, '%k'), ' 4');
            assert.equal(_.strftime(topic, '%l'), ' 4');
            assert.equal(_.strftime(topic, '%M'), '05');
            assert.equal(_.strftime(topic, '%m'), '02');
            assert.equal(_.strftime(topic, '%n'), '\n');
//            assert.equal(_.strftime(topic, '%p'), '');
            assert.equal(_.strftime(topic, '%R'), '04:05');
//            assert.equal(_.strftime(topic, '%r'), '');
            assert.equal(_.strftime(topic, '%S'), '06');
//            assert.equal(_.strftime(topic, '%s'), '');
            assert.equal(_.strftime(topic, '%T'), '04:05:06');
            assert.equal(_.strftime(topic, '%t'), '\t');
//            assert.equal(_.strftime(topic, '%U'), '');
//            assert.equal(_.strftime(topic, '%u'), '');
//            assert.equal(_.strftime(topic, '%V'), '');
//            assert.equal(_.strftime(topic, '%v'), '');
//            assert.equal(_.strftime(topic, '%W'), '');
//            assert.equal(_.strftime(topic, '%w'), '');
//            assert.equal(_.strftime(topic, '%X'), '');
//            assert.equal(_.strftime(topic, '%x'), '');
            assert.equal(_.strftime(topic, '%Y'), '2001');
            assert.equal(_.strftime(topic, '%y'), '01');
//            assert.equal(_.strftime(topic, '%Z'), '');
//            assert.equal(_.strftime(topic, '%z'), '');
            assert.equal(_.strftime(topic, '%%'), '%');
        },
        'should support strftime edge cases': function () {
            assert.equal(_.strftime(_.date(2001, 1, 1, 0), '%I'), '12');
            assert.equal(_.strftime(_.date(2001, 1, 1, 12), '%l'), '12');
        }
    }
}).export(module);

/*
var date = _.date(2011, 1, 25); // 25th January(!) 2011
assert.equal(_.month(date), 1);
assert.equal(_.month(date), _.month.JANUARY);
*/