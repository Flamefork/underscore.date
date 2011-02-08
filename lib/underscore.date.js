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
            format = format.replace(/%([DFhRrTv])/g, function (s, key) {
                switch (key) {
                    case 'D': return '%m/%d/%y';
                    case 'F': return '%Y-%m-%d';
                    case 'h': return '%b';
                    case 'R': return '%H:%M';
                    case 'r': return '%I:%M:%S %p';
                    case 'T': return '%H:%M:%S';
                    case 'v': return '%e-%b-%Y';
                    default: return s;
                }
            });
            return format.replace(/%([AaBbCcDdeFGgHhIjklMmnpRrSsTtTtUuVvWwXxYyZz%])/g, function (s, key) {
                switch (key) {
                    case 'A': return '!';
                    case 'a': return '!';
                    case 'B': return '!';
                    case 'b': return '!';
                    case 'C': return pad(~~(d.getFullYear()/100), 2);
                    case 'c': return '!';
                    case 'd': return pad(d.getDate(), 2);
                    case 'e': return pad(d.getDate(), 2, ' ');
                    case 'G': return '!';
                    case 'g': return '!';
                    case 'H': return pad(d.getHours(), 2);
                    case 'I': return pad(d.getHours() % 12 || 12, 2);
                    case 'j': return '!';
                    case 'k': return pad(d.getHours(), 2, ' ');
                    case 'l': return pad(d.getHours() % 12 || 12, 2, ' ');
                    case 'M': return pad(d.getMinutes(), 2);
                    case 'm': return pad(d.getMonth()+1, 2);
                    case 'n': return '\n';
                    case 'p': return '!';
                    case 'S': return pad(d.getSeconds(), 2);
                    case 's': return '!';
                    case 't': return '\t';
                    case 'U': return '!';
                    case 'u': return '!';
                    case 'V': return '!';
                    case 'W': return '!';
                    case 'w': return '!';
                    case 'X': return '!';
                    case 'x': return '!';
                    case 'Y': return pad(d.getFullYear(), 4);
                    case 'y': return pad(d.getFullYear() % 100, 2);
                    case 'Z': return '!';
                    case 'z': return '!';
                    case '%': return '%';
                    default: return s;
                }
            });
        }
    };

    // CommonJS module is defined
    if (typeof window === 'undefined' && typeof module !== 'undefined') {
        // Export module
        module.exports = _d;

    // Integrate with Underscore.js
    } else if (typeof root._ !== 'undefined') {
        root._.mixin(_d);

    // Or define it
    } else {
        root._ = _d;
    }

}());