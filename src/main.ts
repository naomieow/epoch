import { MCFunction, Objective, _ } from 'sandstone';

const constants = Objective.create('epoch.constants', 'dummy', [{text: 'Epoch Constants'}])
const daysOfMonth = Objective.create('epoch.daysinmon', 'dummy', [{text: 'Days in a Month'}])
const dateTime = Objective.create('epoch.date_time', 'dummy', [{text: 'DateTime'}]);

const unix = dateTime('$unix');
const hour = dateTime('$hrs');
const day = dateTime('$day');
const months = dateTime('$mon');
const years = dateTime('$yrs');
const mins = dateTime('$mins');
const secs = dateTime('$secs');

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
const flag = dateTime('#flag');

MCFunction("constants", () => {
    daysOfMonth("$jan").set(31);
    daysOfMonth("$feb").set(28);
    daysOfMonth("$mar").set(31);
    daysOfMonth("$apr").set(30);
    daysOfMonth("$may").set(31);
    daysOfMonth("$jun").set(30);
    daysOfMonth("$jul").set(31);
    daysOfMonth("$aug").set(31);
    daysOfMonth("$sep").set(30);
    daysOfMonth("$oct").set(31);
    daysOfMonth("$nov").set(30);
    daysOfMonth("$dec").set(31);

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

function calcCurrYear() {
    _.while(runLoop.equalTo(c1), () => {
        _.if(_.or(currYear.moduloBy(c400).equalTo(c0), _.and(currYear.moduloBy(c4).equalTo(c0), currYear.moduloBy(c100).notEqualTo(c0))), () => {
            _.if(daysTillNow.lessThan(c366), () => {
                _.
            }) 
        })
    })
}

MCFunction("unix_ms_to_datetime", () => {
    daysTillNow.set(unix).divide(c24x60x60);
    extraTime.set(unix).modulo(c24x60x60);
    currYear.set(c1970);
    calcCurrYear();
})