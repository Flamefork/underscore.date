// Underscore.date
// (c) 2011 Ilia Ablamonov <ilia@flamefork.ru>
// Underscore.date is freely distributable under the terms of the MIT license.
// Documentation: https://github.com/Flamefork/underscore.date
// Some code is borrowed from Underscore.string.

(function(){
    // ------------------------- Baseline setup ---------------------------------

    // Establish the root object, "window" in the browser, or "global" on the server.
    var root = this;
    
    function pad(number, digits, fill){
        fill = fill || '0';
        var result = ''+number;
        for (var i = 1, j = 10; i < digits; i++, j = j*10) {
            if (number < j) result = fill + result;
        }
        return result;
    }

    var _d = {
        date: function (year, month, day, hour, minute, second, millisecond) {
            return new Date(
                year,
                month - 1,
                day,
                hour || 0,
                minute || 0,
                second || 0,
                millisecond || 0
            );
        },
        utc: function (year, month, day, hour, minute, second, millisecond) {
            return new Date(Date.UTC(
                year,
                month - 1,
                day,
                hour || 0,
                minute || 0,
                second || 0,
                millisecond || 0
            ));
        },
        /**
         * Returns day of week (0..6)
         * @param start Starting day of week (0..6)
         */
        dayOfWeek: function (d, start) {
            var r = d.getDay() - start;
            return r >= 0 ? r : r + 7;
        },
        dayOfYear: function (d) {
            var ref = _d.date(d.getFullYear(), 1, 1);
            return Math.round((d - ref) / 864e5) + 1;
        },
        /**
         * @param start String|Number 'iso'|0..6
         */
        weekNumber: function (d, start) {
            if (start == 'iso') {
                var result = _d.weekNumber(d, 1);
                
                var jan1Weekday = _d.date(d.getFullYear(), 1, 1).getDay();
                
                if (jan1Weekday > 1 && jan1Weekday <= 4) {
                    result += 1;
                }
                if (result == 53 && _d.date(d.getFullYear(), 12, 31).getDay() < 4) {
                    result = 1;
                }
                if (result == 0) {
                    result = _d.weekNumber(_d.date(d.getFullYear() - 1, 12, 31), 'iso');
                }
                return result;
            } else {
                return ~~((_d.dayOfYear(d) + 6 - _d.dayOfWeek(d, start)) / 7);
            }
        },
        weekBasedYear: function (d) {
            var result = d.getFullYear();
            
            var isoWn = _d.weekNumber(d, 'iso');
            var monWn = _d.weekNumber(d, 1);
            
            if (monWn == 0 && isoWn >= 52) {
                result -= 1;
            }
            if (monWn > isoWn) {
                result += 1;
            }
            return result;
        },
        timeZone: function (d, numeric) {
            if (numeric) {
                return d.toString().match(/.*GMT(.{5}).*/)[1];
            } else {
                return d.toString().match(/.*\((\w+)\)/)[1];
            }
        },
        /**
         *  %A  is replaced by national representation of the full weekday name.
         *  %a  is replaced by national representation of the abbreviated weekday name.
         *  %B  is replaced by national representation of the full month name.
         *  %b  is replaced by national representation of the abbreviated month name.
         *  %C  is replaced by (year / 100) as decimal number; single digits are preceded by a zero.
         *  %c  is replaced by national representation of time and date.
         *  %D  is equivalent to ``%m/%d/%y''.
         *  %d  is replaced by the day of the month as a decimal number (01-31).
         *  %e  is replaced by the day of month as a decimal number (1-31); single digits are preceded by a blank.
         *  %F  is equivalent to ``%Y-%m-%d''.
         *  %G  is replaced by a year as a decimal number with century.  This year is the one that contains the greater part of the week (Monday as the first day of the week).
         *  %g  is replaced by the same year as in ``%G'', but as a decimal number without century (00-99).
         *  %H  is replaced by the hour (24-hour clock) as a decimal number (00-23).
         *  %h  the same as %b.
         *  %I  is replaced by the hour (12-hour clock) as a decimal number (01-12).
         *  %j  is replaced by the day of the year as a decimal number (001-366).
         *  %k  is replaced by the hour (24-hour clock) as a decimal number (0-23); single digits are preceded by a blank.
         *  %l  is replaced by the hour (12-hour clock) as a decimal number (1-12); single digits are preceded by a blank.
         *  %M  is replaced by the minute as a decimal number (00-59).
         *  %m  is replaced by the month as a decimal number (01-12).
         *  %n  is replaced by a newline.
         *  %p  is replaced by national representation of either "ante meridiem" or "post meridiem" as appropriate.
         *  %R  is equivalent to ``%H:%M''.
         *  %r  is equivalent to ``%I:%M:%S %p''.
         *  %S  is replaced by the second as a decimal number (00-60).
         *  %s  is replaced by the number of seconds since the Epoch, UTC (see mktime(3)).
         *  %T  is equivalent to ``%H:%M:%S''.
         *  %t  is replaced by a tab.
         *  %U  is replaced by the week number of the year (Sunday as the first day of the week) as a decimal number (00-53).
         *  %u  is replaced by the weekday (Monday as the first day of the week) as a decimal number (1-7).
         *  %V  is replaced by the week number of the year (Monday as the first day of the week) as a decimal number (01-53).  If the week containing January 1 has four or more days in the new year, then it is week 1; otherwise it is the last week of the previous year, and the next week is week 1.
         *  %v  is equivalent to ``%e-%b-%Y''.
         *  %W  is replaced by the week number of the year (Monday as the first day of the week) as a decimal number (00-53).
         *  %w  is replaced by the weekday (Sunday as the first day of the week) as a decimal number (0-6).
         *  %X  is replaced by national representation of the time.
         *  %x  is replaced by national representation of the date.
         *  %Y  is replaced by the year with century as a decimal number.
         *  %y  is replaced by the year without century as a decimal number (00-99).
         *  %Z  is replaced by the time zone name.
         *  %z  is replaced by the time zone offset from UTC; a leading plus sign stands for east of UTC, a minus sign for west of UTC, hours and minutes follow with two digits each and no delimiter between them (common form for RFC 822 date headers).
         *  %%  is replaced by `%'.        
         */
        strftime: function (d, format) {
            var locale = _d.strftime.i18n[_d.strftime.i18n.locale] || _d.strftime.i18n._default;
            format = format.replace(/%([cDFhRrTvXx])/g, function (s, key) {
                switch (key) {
                    case 'c': return locale.dateTimeFormat;
                    case 'D': return '%m/%d/%y';
                    case 'F': return '%Y-%m-%d';
                    case 'h': return '%b';
                    case 'R': return '%H:%M';
                    case 'r': return '%I:%M:%S %p';
                    case 'T': return '%H:%M:%S';
                    case 'v': return '%e-%b-%Y';
                    case 'X': return locale.timeFormat;
                    case 'x': return locale.dateFormat;
                    default: return s;
                }
            });
            return format.replace(/%([AaBbCDdeFGgHhIjklMmnpRrSsTtTtUuVvWwYyZz%])/g, function (s, key) {
                switch (key) {
                    case 'A': return locale.fullWeekdays[d.getDay()];
                    case 'a': return locale.shortWeekdays[d.getDay()];
                    case 'B': return locale.fullMonths[d.getMonth()];
                    case 'b': return locale.shortMonths[d.getMonth()];
                    case 'C': return pad(~~(d.getFullYear()/100), 2);
                    case 'd': return pad(d.getDate(), 2);
                    case 'e': return pad(d.getDate(), 2, ' ');
                    case 'G': return pad(_d.weekBasedYear(d), 4);
                    case 'g': return pad(_d.weekBasedYear(d) % 100, 2);
                    case 'H': return pad(d.getHours(), 2);
                    case 'I': return pad(d.getHours() % 12 || 12, 2);
                    case 'j': return pad(_d.dayOfYear(d), 3);
                    case 'k': return pad(d.getHours(), 2, ' ');
                    case 'l': return pad(d.getHours() % 12 || 12, 2, ' ');
                    case 'M': return pad(d.getMinutes(), 2);
                    case 'm': return pad(d.getMonth()+1, 2);
                    case 'n': return '\n';
                    case 'p': return locale.ampm[~~(d.getHours()/12)];
                    case 'S': return pad(d.getSeconds(), 2);
                    case 's': return ~~(d.getTime() / 1000);
                    case 't': return '\t';
                    case 'U': return pad(_d.weekNumber(d, 0), 2);
                    case 'u': return d.getDay() || 7;
                    case 'V': return pad(_d.weekNumber(d, 'iso'), 2);
                    case 'W': return pad(_d.weekNumber(d, 1), 2);
                    case 'w': return d.getDay();
                    case 'Y': return pad(d.getFullYear(), 4);
                    case 'y': return pad(d.getFullYear() % 100, 2);
                    case 'Z': return _d.timeZone(d);
                    case 'z': return _d.timeZone(d, true);
                    case '%': return '%';
                    default: return s;
                }
            });
        },
        dateFromISOString: function (isoDateStr, tryNative) {
            if (tryNative !== false) {
                var date = new Date(isoDateStr);
                if (!isNaN(date)) return date;
            }
            
            var d = isoDateStr.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})(T([0-9]{2}):([0-9]{2}):([0-9]{2})(\.([0-9]+))?)?(Z|([-+])([0-9]{2})(:([0-9]{2}))?)?/);
            
            for(var i=0; i < d.length; i++) {
                var n = Number(d[i] || 0);
                if (!isNaN(n)) d[i] = n;
            }
            
            var result = _d.utc(d[1], d[2], d[3], d[5], d[6], d[7], d[9]);
            
            if (d[10] != 'Z') {
                var offset = Number(d[12]) * 60 + Number(d[14]);
                if (d[11] == '-') offset = offset * -1;
                
                result.setTime(result.getTime() + offset * 60 * 1000);
            }
            
            return result;
        },
        distanceOfTimeInWords: function (fromTime, toTime, includeSeconds) {
            toTime = toTime || new Date();
            var locale = _d.distanceOfTimeInWords.i18n[_d.distanceOfTimeInWords.i18n.locale] || _d.distanceOfTimeInWords.i18n._default;

            var dim = Math.round(Math.abs(toTime - fromTime) / 1000 / 60);
            var dis = Math.round(Math.abs(toTime - fromTime) / 1000);

            if (dim < 2) {
                if (!includeSeconds) {
                    return dim == 0 ? locale('less than', 1, 'minute') : locale('', 1, 'minute');
                }
                if (dis < 5) {
                    return locale('less than', 5, 'second');
                } else if (dis < 10) {
                    return locale('less than', 10, 'second');
                } else if (dis < 20) {
                    return locale('less than', 20, 'second');
                } else if (dis < 40) {
                    return locale('half', 1, 'minute');
                } else if (dis < 60) {
                    return locale('less than', 1, 'minute');
                } else {
                    return locale('', 1, 'minute');
                }
            } else if (dim < 45) {
                return locale('', dim, 'minute');
            } else if (dim < 90) {
                return locale('about', 1, 'hour');
            } else if (dim < 1440) {
                return locale('about', Math.round(dim / 60), 'hour');
            } else if (dim < 2530) {
                return locale('', 1, 'day');
            } else if (dim < 43200) {
                return locale('', Math.round(dim / 1440), 'day');
            } else if (dim < 86400) {
                return locale('about', 1, 'month');
            } else if (dim < 525600) {
                return locale('', Math.round(dim / 43200), 'month');
            } else {
                var diy = Math.floor(dim / 525600);
                var leapYearOffset = Math.floor(diy / 4) * 1440;
                var rem = (dim - leapYearOffset) % 525600;
                
                if (rem < 131400) {
                    return locale('about', diy, 'year');
                } else if (rem < 394200) {
                    return locale('over', diy, 'year');
                } else {
                    return locale('almost', diy, 'year');
                }
            }
        }
    };

    _d.strftime.i18n = {
        '_default': {
            fullMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            fullWeekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            ampm: ['AM', 'PM'],
            dateTimeFormat: '%a %b %e %H:%M:%S %Y',
            dateFormat: '%m/%d/%y',
            timeFormat: '%H:%M:%S'
        },
        locale: 'en'
    };
    _d.strftime.i18n.en = _d.strftime.i18n._default;
    
    _d.distanceOfTimeInWords.i18n = {
        '_default': function (qualifier, count, measure) {
            if (count == 1 && measure == 'minute' && (qualifier == 'less than' || qualifier == 'half')) {
                count = 'a';
            }
            return [
                qualifier,
                count,
                measure + (count > 1 ? 's' : '')
            ].join(' ').trim();
        },
        locale: 'en'
    };
    _d.distanceOfTimeInWords.i18n.en = _d.distanceOfTimeInWords.i18n._default;

    // CommonJS module is defined
    if (typeof exports !== 'undefined') {
        
        // Export module
        if (typeof module !== 'undefined' && module.exports) {
          exports = module.exports = _d;
        }
        exports._d = _d;

    // Integrate with Underscore.js
    } else if (typeof root._ !== 'undefined') {
        root._.mixin(_d);

    // Or define it
    } else {
        root._ = _d;
    }

}());