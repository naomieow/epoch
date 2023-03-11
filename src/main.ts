import { MCFunction, Objective, _, Score } from 'sandstone';

const constants = Objective.create('epoch.constants', 'dummy', [{text: 'Epoch Constants'}])
const daysOfMonth = Objective.create('epoch.daysinmon', 'dummy', [{text: 'Days in a Month'}])
const dateTime = Objective.create('epoch.date_time', 'dummy', [{text: 'DateTime'}]);

const unix = dateTime('$unix');

const jan = daysOfMonth("$jan")
const feb = daysOfMonth("$feb")
const mar = daysOfMonth("$mar")
const apr = daysOfMonth("$apr")
const may = daysOfMonth("$may")
const jun = daysOfMonth("$jun")
const jul = daysOfMonth("$jul")
const aug = daysOfMonth("$aug")
const sep = daysOfMonth("$sep")
const oct = daysOfMonth("$oct")
const nov = daysOfMonth("$nov")
const dec = daysOfMonth("$dec")

const c24x60x60 = constants("$24x60x60");
const c3600 = constants("$3600");
const c1970 = constants("$1970");
const c400 = constants("$400");
const c366 = constants("$366");
const c365 = constants("$365");
const c100 = constants("$100");
const c60 = constants("$60");
const c29 = constants("$29");
const c4 = constants("$4");
const c2 = constants("$2");
const c1 = constants("$1");
const c0 = constants("$0");

const runLoop = dateTime('#loopRunning');
const daysTillNow = dateTime('#daysTillNow');
const extraTime = dateTime('#extraTime');
const currYear = dateTime('#currYear');
const extraDays = dateTime('#extraDays');
const flag = dateTime('#flag');
const month = dateTime('#month');
const index = dateTime('#index');
const domTracker = dateTime('#domTracker');
const date = dateTime('#date');
const hours = dateTime('#hours');
const minutes = dateTime('#minutes');
const seconds = dateTime('#seconds');

function getMonthFromIndex(sel: Score<string>) {
    _.if(sel.equalTo(1), () => {
        domTracker.set(jan);
    })
    .elseIf(sel.equalTo(2), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(3), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(4), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(5), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(6), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(7), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(8), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(9), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(10), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(11), () => {
        domTracker.set(feb)
    })
    .elseIf(sel.equalTo(12), () => {
        domTracker.set(feb)
    })
}

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

    c24x60x60.set(20*60*60);
    c3600.set(3600);
    c1970.set(1970);
    c400.set(400);
    c366.set(366);
    c365.set(365);
    c100.set(100);
    c60.set(60);
    c29.set(29);
    c4.set(4);
    c2.set(2);
    c1.set(1);
    c0.set(0);
    
}, { runOnLoad: true })


MCFunction("unix_ms_to_datetime", () => {
    daysTillNow.set(unix).divide(c24x60x60);
    extraTime.set(unix).modulo(c24x60x60);
    currYear.set(c1970);
    runLoop.set(c1);

    _.while(runLoop.equalTo(c1), () => {
        _.if(_.or(currYear.moduloBy(c400).equalTo(c0), _.and(currYear.moduloBy(c4).equalTo(c0), currYear.moduloBy(c100).notEqualTo(c0))), () => {
            _.if(daysTillNow.lessThan(c366), () => {
                runLoop.set(c0);
            }) 
            _.if(runLoop.equalTo(c1), () => {
                daysTillNow.remove(c366);
            })
        })
        .else(() => {
            _.if(daysTillNow.lessThan(c365), () => {
                runLoop.set(c0);
            }) 
            _.if(runLoop.equalTo(c1), () => {
                daysTillNow.remove(c365);
            })
        })
        currYear.add(c1);
    })

    runLoop.reset();

    extraDays.set(daysTillNow).add(c1);

    _.if(_.or((currYear.moduloBy(c400).equalTo(c0)), _.and(currYear.moduloBy(c4).equalTo(c0), currYear.moduloBy(c100).equalTo(c0))), () => {
        flag.set(c1);
    })

    month.set(c0);
    index.set(c0);

    _.if(flag.equalTo(c1), () => {
        runLoop.set(c1);
        _.while(runLoop.equalTo(c1), () => {
            _.if(index.equalTo(c1), () => {
                _.if(extraDays.minus(c29).lessThan(c0), () => {
                    runLoop.set(c0);
                })
                _.if(runLoop.equalTo(c1), () => {
                    month.add(c1);
                    extraDays.remove(c29);
                })
            })
            .else(() => {
                getMonthFromIndex(index);
                _.if(extraDays.minus(domTracker).lessThan(c0), () => {
                    runLoop.set(c0);
                })
                _.if(runLoop.equalTo(c1), () => {
                    month.add(c1);
                    extraDays.remove(domTracker);
                })
            })
            _.if(runLoop.equalTo(c1), () => {
                index.add(c1);
            })
        })
        runLoop.reset();
    })
    .else(() => {
        runLoop.set(c1);
        _.while(runLoop.equalTo(c1), () => {
            _.if(extraDays.minus(domTracker).lessThan(c0), () => {
                runLoop.set(c0);
            })
            _.if(runLoop.equalTo(c1), () => {
                month.add(c1);
                extraDays.remove(domTracker);
                index.add(c1);
            })
        })
    })

    _.if(extraDays.greaterThan(0), () => {
        month.add(c1);
        date.set(extraDays);
    })
    .else(() => {
        _.if(_.and(month.equalTo(c2), flag.equalTo(c1)), () => {
            date.set(c29);
        })
        .else(() => {
            getMonthFromIndex(index.minus(c1));
            date.set(domTracker);
        })
    })

    hours.set(extraTime).dividedBy(c3600);
    minutes.set(extraTime).moduloBy(c3600).dividedBy(c60);
    seconds.set(extraTime).moduloBy(c3600).moduloBy(c60);
})