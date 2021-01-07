import { InvalidDateError } from "./error";

/**
 * @description Simple Date Util
 */
class Dtil {
  private readonly _date: Date;

  get date(): Date {
    return this._date;
  }

  constructor(date?: string | Date | number) {

    if (date === undefined) {
      this._date = new Date();
      return;
    }

    if (typeof date === 'string') {
      const dateTime = Date.parse(date);
      if (isNaN(dateTime)) {
        throw new InvalidDateError(`string '${date}'is not date string`);
      }

      this._date = new Date(dateTime);
      return;
    }

    if (typeof date === 'number') {
      this._date = new Date(date);
      return;
    }

    throw new TypeError(`param ${date} type is not string | number | undefined`);
  }

  /**
   * 
   * @param formatForm formatForm string with time form char
   */
  public format = (formatForm: string): string => {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const _date = this.date.getDate();
    const hour = this.date.getHours();
    const minute = this.date.getMinutes();
    const second = this.date.getSeconds();

    let formatStr = formatForm;

    formatStr = formatStr.replace(/yyyy/gi, String(year));

    formatStr = formatStr.replace(/MM/g, this.zeroFill(month, 2));
    formatStr = formatStr.replace(/M/g, String(month));

    formatStr = formatStr.replace(/dd/gi, this.zeroFill(_date, 2));
    formatStr = formatStr.replace(/d/gi, String(_date));

    formatStr = formatStr.replace(/HH/g, this.zeroFill(hour, 2));
    formatStr = formatStr.replace(/H/g, String(hour));

    formatStr = formatStr.replace(/hh/g, this.zeroFill(this.convertHHTohh(hour), 2));
    formatStr = formatStr.replace(/h/g, String(this.convertHHTohh(hour)));

    formatStr = formatStr.replace(/mm/g, this.zeroFill(minute, 2));
    formatStr = formatStr.replace(/m/g, String(minute));

    formatStr = formatStr.replace(/ss/gi, this.zeroFill(second, 2));
    formatStr = formatStr.replace(/s/gi, String(second));

    return formatStr;
  }

  /**
 * @description check date after target
 */
  public isAfter = (target: Date): boolean => {
    const dateTime = this.date.getTime();
    const targetTime = target.getTime();

    if (dateTime > targetTime) {
      return true;
    }

    return false;
  }

  /**
   * @description check date after now
   */
  public isAfterNow = (): boolean => {
    return this.isAfter(new Date());
  }

  /**
   * @description check date before target
   */
  public isBefore = (target: Date): boolean => {
    const dateTime = this.date.getTime();
    const targetTime = target.getTime();

    if (dateTime < targetTime) {
      return true;
    }

    return false;
  }

  /**
   * @description check date before now
   */
  public isBeforeNow = (): boolean => {
    return this.isBefore(new Date());
  }


  /**
   * @description check date and target same date
   */
  public isSameDate = (target: Date) => {
    const dateYear = this.date.getFullYear();
    const dateMonth = this.date.getMonth();
    const dateDate = this.date.getDate();

    const targetYear = target.getFullYear();
    const targetMonth = target.getMonth();
    const targetDate = target.getDate();

    if (dateYear === targetYear
      && dateMonth === targetMonth
      && dateDate === targetDate) {
      return true;
    }

    return false;
  }

  /**
   * 
   * @param target zeroFill target
   * @param len total length with zero
   */
  private zeroFill = (target: number, len: number): string => {
    const targetStr = target.toString();

    const zeroCount = len - targetStr.length;
    const zeroList = [];
    for (let i = 0; i < zeroCount; i += 1) {
      zeroList.push('0');
    }

    return `${zeroList.join()}${targetStr}`;
  }

  /**
   * @description convert 24 hour system to 12 hour system
   */
  private convertHHTohh = (hour: number): number => {
    if (hour >= 24) {
      return 0;
    }

    if (hour > 12) {
      return hour - 12;
    }

    return hour;
  }
}

export = (date?: string | Date | number): Dtil => new Dtil(date);