# Underscore.date

Heavily inspired by Underscore.string project

Date/iime operations support in JavaScript is far from ideal. Goal of this project is consistent date/time library.

As name states this an extension for Underscore.js, but it can be used independently from _d-global variable. But with Underscore.js you can use Object-Oriented style.

## Status

Project is far form complete.
For now it has only convinient constructors and strftime function implementation as major part.

Roadmap:  
— Date/time arithmetic  
— Real support for time zones

## Date constructors

Main goal of this constructors was to use obvious month numbers - 1 for January not 0.
Yes, it's opinionated and I specially appreciate any feedback on this decision.

They both produce native JavaScript Date objects.

### _.date(y, m, d, [h, m, s])

    _.date(2011, 2, 19)
    => [Sat Feb 19 2011 00:00:00 GMT+0300 (MSK)]

### _.utc(y, m, d, [h, m, s])

    _.utc(2011, 2, 19)
    => [Sat, 19 Feb 2011 00:00:00 GMT]

This constructor creates Date object from ISO 8601 string (like in JSON).
Unless you pass false as a second argument, it will try to use native support for this format.

### _.dateFromISOString(iso8601string, [tryNative])

    _.dateFromISOString('2011-08-31T16:09:51Z')
    => [Wed, 31 Aug 2011 16:09:51 GMT]

## Date functions

### _.strftime(date, format)

C like date formatting. For more detailed documentation, see the [man page][mp].

[mp]: http://www.kernel.org/doc/man-pages/online/pages/man3/strftime.3.html

    _.strftime(_.date(2011, 2, 19, 10, 30), '%Y-%m-%d %H:%M:%S %Z')
    => '2011-02-19 10:30:00 MSK'

Localization for non-English locales can be achieved by providing hash with strings like the following:

    _.strftime.i18n.en = {
        fullMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        fullWeekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ampm: ['AM', 'PM'],
        dateTimeFormat: '%a %b %e %H:%M:%S %Y',
        dateFormat: '%m/%d/%y',
        timeFormat: '%H:%M:%S'
    };

### _.dayOfYear(date)

Day of the year (001-366)

    _.dayOfYear(_.date(2001, 10, 10))
    => 283

### _.dayOfWeek(date, start)

Day of the week (0-6), where weeks starts from given day:
start: 0 for Sunday, 1 for Monday etc
result: 0 for same day as start

    _.dayOfWeek(_.date(2001, 1, 1), 0)
    => 1

### _.weekNumber(date, start)

There is two implementations for different use cases:
**simple**
Week number of the year (00-53), where weeks starts from given day:
start: 0 for Sunday, 1 for Monday etc

**ISO**
start: 'iso'
Week number of the year (01-53), Monday as the first day of the week.
If the week containing January 1 has four or more days in the new year, then it is week 1; otherwise it is the last week of the previous year, and the next week is week 1.

    _.weekNumber(_.date(2005, 1, 1), 1)
    => 0
    _.weekNumber(_.date(2005, 1, 1), 'iso')
    => 53

### _.weekBasedYear(date, start)

This year is the one that contains the greater part of the week (Monday as the first day of the week).

    _.weekBasedYear(_.date(2005, 1, 1))
    => 2004

### _.timeZone(date, [numeric])

Unless numeric flag given, returns time zone name.

If numeric flag given, returns time zone offset from UTC; a leading plus sign stands for east of UTC, a minus sign for west of UTC, hours and minutes follow with two digits each and no delimiter between them (common form for RFC 822 date headers).

    _.timeZone(_.date(2011, 2, 19))
    => 'MSK'
    _.timeZone(_.date(2011, 2, 19), true)
    => '+300'

Any suggestions or bug reports are welcome. Just email me or more preferably open an issue.