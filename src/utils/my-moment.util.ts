import moment from 'moment';

export class Moment {
  private static updateStartOfWeek() {
    moment.updateLocale('en', { week: { dow: 6, doy: 12 } });
  }

  public static getYearFromDate(date: Date): number {
    return moment(date).year();
  }

  public static getCurrentWeek(): number {
    this.updateStartOfWeek();

    return moment().week();
  }

  public static getCurrentYear(): number {
    return moment().year();
  }

  public static getCurrentMonthName(): string {
    return moment().format('MMMM');
  }

  public static getCurrentStringDate(): string {
    return moment().format('DD-MM-YYYY');
  }

  public static getCurrentDate(): Date {
    return moment().toDate();
  }

  public static isBiggerThanNow(date: Date): boolean {
    const myDate = moment(date);

    return moment().isAfter(myDate);
  }

  public static getStartTimeOfWeek(week: number, year: number): number {
    this.updateStartOfWeek();
    const myDate = moment().week(week).year(year).startOf('week');

    return myDate.unix();
  }

  public static getEndTimeOfWeek(week: number, year: number): number {
    this.updateStartOfWeek();
    const myDate = moment().week(week).year(year).endOf('week');

    return myDate.unix();
  }

  public static getStartTimeOfMonth(year: number): number {
    return moment().year(year).startOf('month').unix();
  }

  public static getEndTimeOfMonth(year: number): number {
    return moment().year(year).endOf('month').unix();
  }

  public static getCurrentTimestamp() {
    return moment().unix();
  }

  public static diffToNow(myDate: Date): number {
    const myMomentDate = moment(myDate);
    const momentNow = moment().startOf('days');
    const duration = moment.duration(momentNow.diff(myMomentDate));

    return Math.floor(duration.asDays());
  }

  public static convertDateToTimestamp(date: Date) {
    return moment(date).unix();
  }

  public static convertTimestampToDate(timestamp: number): Date {
    return moment.unix(timestamp).toDate();
  }

  public static isGreaterThanOne(firstDate: Date, secondDate: Date): boolean {
    return moment(firstDate).isAfter(secondDate);
  }

  public static isSameDate(firstDate: Date, secondDate: Date): boolean {
    const momentFirstDate = moment(firstDate);
    const momentSecondDate = moment(secondDate);

    return momentFirstDate.isSame(momentSecondDate, 'day');
  }
}
