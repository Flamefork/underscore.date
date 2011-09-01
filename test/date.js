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
            assert.equal(_.strftime(topic, '%A'), 'Saturday');
            assert.equal(_.strftime(topic, '%a'), 'Sat');
            assert.equal(_.strftime(topic, '%B'), 'February');
            assert.equal(_.strftime(topic, '%b'), 'Feb');
            assert.equal(_.strftime(topic, '%C'), '20');
            assert.equal(_.strftime(topic, '%c'), 'Sat Feb  3 04:05:06 2001');
            assert.equal(_.strftime(topic, '%D'), '02/03/01');
            assert.equal(_.strftime(topic, '%d'), '03');
            assert.equal(_.strftime(topic, '%e'), ' 3');
            assert.equal(_.strftime(topic, '%F'), '2001-02-03');
            assert.equal(_.strftime(topic, '%G'), '2001');
            assert.equal(_.strftime(topic, '%g'), '01');
            assert.equal(_.strftime(topic, '%H'), '04');
            assert.equal(_.strftime(topic, '%h'), 'Feb');
            assert.equal(_.strftime(topic, '%I'), '04');
            assert.equal(_.strftime(topic, '%j'), '034');
            assert.equal(_.strftime(topic, '%k'), ' 4');
            assert.equal(_.strftime(topic, '%l'), ' 4');
            assert.equal(_.strftime(topic, '%M'), '05');
            assert.equal(_.strftime(topic, '%m'), '02');
            assert.equal(_.strftime(topic, '%n'), '\n');
            assert.equal(_.strftime(topic, '%p'), 'AM');
            assert.equal(_.strftime(topic, '%R'), '04:05');
            assert.equal(_.strftime(topic, '%r'), '04:05:06 AM');
            assert.equal(_.strftime(topic, '%S'), '06');
            assert.equal(_.strftime(topic, '%s'), (981173106 + topic.getTimezoneOffset()*60).toString());
            assert.equal(_.strftime(topic, '%T'), '04:05:06');
            assert.equal(_.strftime(topic, '%t'), '\t');
            assert.equal(_.strftime(topic, '%U'), '04');
            assert.equal(_.strftime(topic, '%u'), '6');
            assert.equal(_.strftime(topic, '%V'), '05');
            assert.equal(_.strftime(topic, '%v'), ' 3-Feb-2001');
            assert.equal(_.strftime(topic, '%W'), '05');
            assert.equal(_.strftime(topic, '%w'), '6');
            assert.equal(_.strftime(topic, '%X'), '04:05:06');
            assert.equal(_.strftime(topic, '%x'), '02/03/01');
            assert.equal(_.strftime(topic, '%Y'), '2001');
            assert.equal(_.strftime(topic, '%y'), '01');
            assert.equal(_.strftime(topic, '%%'), '%');
            
        },
        'using local system timezone': {
            topic: function (topic) {
                var callback = this.callback;
                require('child_process').exec('date -j 020304052001 +%Z', function (error, stdout) {
                    var zoneNum = -topic.getTimezoneOffset()/60*100;
                    callback(error, stdout.trim(), zoneNum, topic);
                });
            },
            'should support timeZone method': function (error, zoneName, zoneNum, topic) {
                assert.equal(_.timeZone(topic), zoneName);
                assert.equal(_.timeZone(topic, true), zoneNum);
            },
            'should support strftime timezone feature': function (error, zoneName, zoneNum, topic) {
                assert.equal(_.strftime(topic, '%Z'), zoneName);
                assert.equal(_.strftime(topic, '%z'), zoneNum);
            }
        },
        'should support strftime edge cases': function () {
            assert.equal(_.strftime(_.date(2001, 1, 1, 0), '%I %p'), '12 AM');
            assert.equal(_.strftime(_.date(2001, 1, 1, 12), '%l %p'), '12 PM');
            assert.equal(_.strftime(_.date(2001, 1, 7), '%u'), '7');
            assert.equal(_.strftime(_.date(2001, 1, 7), '%w'), '0');
        },
        'should support dayOfYear method': function () {
            assert.equal(_.dayOfYear(_.date(2001, 1, 1)), 1);
            assert.equal(_.dayOfYear(_.date(2001, 1, 10)), 10);
            assert.equal(_.dayOfYear(_.date(2001, 10, 10)), 283);
            assert.equal(_.dayOfYear(_.date(2000, 12, 31)), 366);
        },
        'should support dayOfWeek method': function () {
            assert.equal(_.dayOfWeek(_.date(2001, 1, 1), 0), 1);
            assert.equal(_.dayOfWeek(_.date(2001, 1, 1), 1), 0);
            assert.equal(_.dayOfWeek(_.date(2001, 1, 1), 3), 5);
            assert.equal(_.dayOfWeek(_.date(2001, 1, 3), 0), 3);
            assert.equal(_.dayOfWeek(_.date(2001, 1, 3), 1), 2);
            assert.equal(_.dayOfWeek(_.date(2001, 1, 3), 3), 0);
        },
        'should support simple weekNumber method': function () {
            assert.equal(_.weekNumber(_.date(2001, 1, 1), 0), 0);
            assert.equal(_.weekNumber(_.date(2001, 1, 1), 1), 1);
            assert.equal(_.weekNumber(_.date(2001, 2, 1), 1), 5);
            assert.equal(_.weekNumber(_.date(2002, 1, 1), 1), 0);
            assert.equal(_.weekNumber(_.date(2002, 2, 1), 1), 4);
            assert.equal(_.weekNumber(_.date(2002, 12, 31), 1), 52);
        },
        'should support ISO weekNumber method': function () {
            assert.equal(_.weekNumber(_.date(2001, 1, 1), 'iso'), 1);
            assert.equal(_.weekNumber(_.date(2001, 2, 1), 'iso'), 5);
            assert.equal(_.weekNumber(_.date(2005, 1, 1), 'iso'), 53);
            assert.equal(_.weekNumber(_.date(2005, 2, 1), 'iso'), 5);
            assert.equal(_.weekNumber(_.date(2001, 12, 31), 'iso'), 1);
            assert.equal(_.weekNumber(_.date(2004, 12, 31), 'iso'), 53);
        },
        'should support ISO weekBasedYear method': function () {
            assert.equal(_.weekBasedYear(_.date(2001, 1, 1)), 2001);
            assert.equal(_.weekBasedYear(_.date(2001, 2, 1)), 2001);
            assert.equal(_.weekBasedYear(_.date(2005, 1, 1)), 2004);
            assert.equal(_.weekBasedYear(_.date(2005, 2, 1)), 2005);
            assert.equal(_.weekBasedYear(_.date(2001, 12, 31)), 2002);
            assert.equal(_.weekBasedYear(_.date(2004, 12, 31)), 2004);
        }
    }
}).export(module);
