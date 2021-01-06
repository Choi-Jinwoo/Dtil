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
   * 
   * @param target zeroFill target
   * @param len total length with zero
   */
  private zeroFill = (target: number, len: number): string => {
    const targetStr = target.toString();

    const zeroCount = len - targetStr.length;
    const zeros = '';
    for (let i = 0; i < zeroCount; i += 1) {
      zeros.concat('0');
    }

    return `${zeros}${targetStr}`;
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