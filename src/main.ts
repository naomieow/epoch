import { MCFunction, Objective, _, Selector, tellraw } from 'sandstone';

const daysOfMonth = Objective.create('epoch.daysinmon', 'dummy', [{text: 'Days in a Month'}])
const dateTime = Objective.create('epoch.date_time', 'dummy', [{text: 'DateTime'}]);

const unix = dateTime('$unix');

const jan = daysOfMonth("$jan");
const feb = daysOfMonth("$feb");
const mar = daysOfMonth("$mar");
const apr = daysOfMonth("$apr");
const may = daysOfMonth("$may");
const jun = daysOfMonth("$jun");
const jul = daysOfMonth("$jul");
const aug = daysOfMonth("$aug");
const sep = daysOfMonth("$sep");
const oct = daysOfMonth("$oct");
const nov = daysOfMonth("$nov");
const dec = daysOfMonth("$dec");

const secondsInDay = 24*60*60
const secondsInYear = secondsInDay*365

const days = dateTime("#days");
const year = dateTime("$year");
const leaps = dateTime("#leaps");
const leapCY = dateTime("#leapCY");
const daysThisYear = dateTime("#dty");
const month = dateTime("$month")
const day = dateTime("$day")


const index = dateTime('#index');
const daysInMonth = dateTime('#daysInMonth');

const getMonthFromIndex = MCFunction("get_month_from_index", () => {
    _.if(index.equalTo(0), () => {
        daysInMonth.set(jan);
    })
    .elseIf(index.equalTo(1), () => {
        daysInMonth.set(feb)
    })
    .elseIf(index.equalTo(2), () => {
        daysInMonth.set(mar)
    })
    .elseIf(index.equalTo(3), () => {
        daysInMonth.set(apr)
    })
    .elseIf(index.equalTo(4), () => {
        daysInMonth.set(may)
    })
    .elseIf(index.equalTo(5), () => {
        daysInMonth.set(jun)
    })
    .elseIf(index.equalTo(6), () => {
        daysInMonth.set(jul)
    })
    .elseIf(index.equalTo(7), () => {
        daysInMonth.set(aug)
    })
    .elseIf(index.equalTo(8), () => {
        daysInMonth.set(sep)
    })
    .elseIf(index.equalTo(9), () => {
        daysInMonth.set(oct)
    })
    .elseIf(index.equalTo(10), () => {
        daysInMonth.set(nov)
    })
    .elseIf(index.equalTo(11), () => {
        daysInMonth.set(dec)
    })
})

MCFunction("constants", () => {
    jan.set(31);
    feb.set(28);
    mar.set(31);
    apr.set(30);
    may.set(31);
    jun.set(30);
    jul.set(31);
    aug.set(31);
    sep.set(30);
    oct.set(31);
    nov.set(30);
    dec.set(31);
}, { runOnLoad: true })


const all = Selector("@a");

MCFunction("unix_ms_to_datetime", () => {
    days.set(unix.dividedBy(secondsInDay));
    year.set(days.dividedBy(365).add(1970));

    leaps.set(0);
    leapCY.set(0);

    index.set(1970);
    _.while(index.lessOrEqualThan(year), () => {
        _.if(_.or(index.moduloBy(400).equalTo(0), _.and(index.moduloBy(4).equalTo(0), index.moduloBy(100).notEqualTo(0))), () => {
            leaps.add(1);
            _.if(index.equalTo(year), () => {
                leapCY.set(1);
            }) 
        })

        index.add(1);
    })

    daysThisYear.set(days.moduloBy(365));
    daysThisYear.remove(leaps.minus(1));

    month.set(0);
    index.set(0);
    _.while(index.lessThan(12), () => {
        getMonthFromIndex();
        _.if(daysInMonth.lessOrEqualThan(daysThisYear), () => {
            month.set(index.plus(1));
            daysThisYear.remove(daysInMonth);
        })
        index.add(1);
    })

    _.if(daysThisYear.greaterThan(0), () => {
        month.add(1);
        day.set(daysThisYear);
    })
    .else(() => {
        index.set(month);
        getMonthFromIndex();
        day.set(daysInMonth);
    })

    _.if(_.and(month.equalTo(2), daysThisYear.equalTo(0), leapCY.equalTo(1)), () => {
        day.set(29);
    })
})