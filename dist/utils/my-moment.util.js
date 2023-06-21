"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moment = void 0;
const moment_1 = __importDefault(require("moment"));
class Moment {
    static updateStartOfWeek() {
        moment_1.default.updateLocale('en', { week: { dow: 6, doy: 12 } });
    }
    static getYearFromDate(date) {
        return (0, moment_1.default)(date).year();
    }
    static getMonthFromDate(date) {
        return (0, moment_1.default)(date).month() + 1;
    }
    static getCurrentWeek() {
        this.updateStartOfWeek();
        return (0, moment_1.default)().week();
    }
    static getCurrentYear() {
        return (0, moment_1.default)().year();
    }
    static getCurrentMonthName() {
        return (0, moment_1.default)().format('MMMM');
    }
    static getCurrentStringDate() {
        return (0, moment_1.default)().format('DD-MM-YYYY');
    }
    static getCurrentDate() {
        return (0, moment_1.default)().toDate();
    }
    static isBiggerThanNow(date) {
        const myDate = (0, moment_1.default)(date);
        return (0, moment_1.default)().isAfter(myDate);
    }
    static getStartTimeOfWeek(week, year) {
        this.updateStartOfWeek();
        const myDate = (0, moment_1.default)().week(week).year(year).startOf('week');
        return myDate.unix();
    }
    static getEndTimeOfWeek(week, year) {
        this.updateStartOfWeek();
        const myDate = (0, moment_1.default)().week(week).year(year).endOf('week');
        return myDate.unix();
    }
    static getStartTimeOfYear(year) {
        return (0, moment_1.default)().year(year).startOf('year').toDate();
    }
    static getEndTimeOfYear(year) {
        return (0, moment_1.default)().year(year).endOf('year').toDate();
    }
    static getCurrentTimestamp() {
        return (0, moment_1.default)().unix();
    }
    static diffToNow(myDate) {
        const myMomentDate = (0, moment_1.default)(myDate);
        const momentNow = (0, moment_1.default)().startOf('days');
        const duration = moment_1.default.duration(momentNow.diff(myMomentDate));
        return Math.floor(duration.asDays());
    }
    static convertDateToTimestamp(date) {
        return (0, moment_1.default)(date).unix();
    }
    static convertTimestampToDate(timestamp) {
        return moment_1.default.unix(timestamp).toDate();
    }
    static isGreaterThanOne(firstDate, secondDate) {
        return (0, moment_1.default)(firstDate).isAfter(secondDate);
    }
    static isSameDate(firstDate, secondDate) {
        const momentFirstDate = (0, moment_1.default)(firstDate);
        const momentSecondDate = (0, moment_1.default)(secondDate);
        return momentFirstDate.isSame(momentSecondDate, 'day');
    }
}
exports.Moment = Moment;
//# sourceMappingURL=my-moment.util.js.map