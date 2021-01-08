import { InvalidDateError } from "./error";

/**
 * @description Simple Date Util
 */
class Dtil {
  private readonly _date: Date;

  get date(): Date {
    return this._date;
  }

  constructor(date?: string | Date | number, format?: string) {
    if (date === undefined) {
      this._date = new Date();
      return;
    }

    if (typeof date === 'string') {
      this._date = this.stringToDate(date, format);
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
    if (typeof target === 'string') {
      target = this.stringToDate(target);
    }

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
  public isBefore = (target: Date | string): boolean => {
    if (typeof target === 'string') {
      target = this.stringToDate(target);
    }

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

  private stringToDate = (date: string, format?: string): Date => {
    if (typeof date === 'string') {
      // is format date
      if (format !== undefined) {
        let year;
        let month;
        let _date;
        let hour;
        let minute;
        let second;

        if (format.indexOf('YYYY') !== -1) {
          year = Number(date.substr(format.indexOf('YYYY'), 4));
          if (isNaN(year)) {
            throw new InvalidDateError(`string ${year} is not number`);
          }
        }

        if (format.indexOf('yyyy') !== -1) {
          if (year === undefined) {
            year = Number(date.substr(format.indexOf('yyyy'), 4));
            if (isNaN(year)) {
              throw new InvalidDateError(`string ${year} is not number`);
            }
          }
        }

        if (format.indexOf('MM') !== -1) {
          month = Number(date.substr(format.indexOf('MM'), 2));
          if (isNaN(month)) {
            throw new InvalidDateError(`string ${month} is not number`);
          }
        }

        if (format.indexOf('M') !== -1) {
          if (month === undefined) {
            month = Number(date.substr(format.indexOf('M'), 1));
            if (isNaN(month)) {
              throw new InvalidDateError(`string ${month} is not number`);
            }
          }
        }

        if (format.indexOf('DD') !== -1) {
          _date = Number(date.substr(format.indexOf('DD'), 2));
          if (isNaN(_date)) {
            throw new InvalidDateError(`string ${_date} is not number`);
          }
        }

        if (format.indexOf('dd') !== -1) {
          if (_date === undefined) {
            _date = Number(date.substr(format.indexOf('dd'), 2));
            if (isNaN(_date)) {
              throw new InvalidDateError(`string ${_date} is not number`);
            }
          }
        }

        if (format.indexOf('D') !== -1) {
          if (_date === undefined) {
            _date = Number(date.substr(format.indexOf('D'), 1));
            if (isNaN(_date)) {
              throw new InvalidDateError(`string ${_date} is not number`);
            }
          }
        }

        if (format.indexOf('d') !== -1) {
          if (_date === undefined) {
            _date = Number(date.substr(format.indexOf('d'), 1));
            if (isNaN(_date)) {
              throw new InvalidDateError(`string ${_date} is not number`);
            }
          }
        }

        if (format.indexOf('HH') !== -1) {
          hour = Number(date.substr(format.indexOf('HH'), 2));
          if (isNaN(hour)) {
            throw new InvalidDateError(`string ${hour} is not number`);
          }
        }

        if (format.indexOf('hh') !== -1) {
          if (hour === undefined) {
            hour = Number(date.substr(format.indexOf('hh'), 2));
            if (isNaN(hour)) {
              throw new InvalidDateError(`string ${hour} is not number`);
            }
          }
        }

        if (format.indexOf('H') !== -1) {
          if (hour === undefined) {
            hour = Number(date.substr(format.indexOf('H'), 1));
            if (isNaN(hour)) {
              throw new InvalidDateError(`string ${hour} is not number`);
            }
          }
        }

        if (format.indexOf('h') !== -1) {
          if (hour === undefined) {
            hour = Number(date.substr(format.indexOf('h'), 1));
            if (isNaN(hour)) {
              throw new InvalidDateError(`string ${hour} is not number`);
            }
          }
        }

        if (format.indexOf('mm') !== -1) {
          minute = Number(date.substr(format.indexOf('mm'), 2));
          if (isNaN(minute)) {
            throw new InvalidDateError(`string ${minute} is not number`);
          }
        }

        if (format.indexOf('m') !== -1) {
          if (minute === undefined) {
            minute = Number(date.substr(format.indexOf('m'), 1));
            if (isNaN(minute)) {
              throw new InvalidDateError(`string ${minute} is not number`);
            }
          }
        }

        if (format.indexOf('SS') !== -1) {
          second = Number(date.substr(format.indexOf('SS'), 2));
          if (isNaN(second)) {
            throw new InvalidDateError(`string ${second} is not number`);
          }
        }

        if (format.indexOf('ss') !== -1) {
          if (second === undefined) {
            second = Number(date.substr(format.indexOf('ss'), 2));
            if (isNaN(second)) {
              throw new InvalidDateError(`string ${second} is not number`);
            }
          }
        }

        if (format.indexOf('s') !== -1) {
          if (second === undefined) {
            second = Number(date.substr(format.indexOf('s'), 1));
            if (isNaN(second)) {
              throw new InvalidDateError(`string ${second} is not number`);
            }
          }
        }

        if (second !== undefined && minute === undefined) {
          throw new InvalidDateError('minute must provide when you format second');
        }

        if (minute !== undefined && hour === undefined) {
          throw new InvalidDateError('hour must provide when you format minute');
        }

        if (hour !== undefined && date === undefined) {
          throw new InvalidDateError('date must provide when you format hour');
        }

        if (date !== undefined && month === undefined) {
          throw new InvalidDateError('month must provide when you format date');
        }

        if (month !== undefined && year === undefined) {
          throw new InvalidDateError('year must provide when you format month');
        }

        if (year === undefined) {
          throw new InvalidDateError('year must provide when you format string');
        }

        if (month === undefined) {
          throw new InvalidDateError('month must provide when you format string');
        }

        if (_date === undefined) {
          return new Date(year, month - 1);
        }

        if (hour === undefined) {
          return new Date(year, month - 1, _date);
        }

        if (minute === undefined) {
          return new Date(year, month - 1, _date, hour);
        }

        if (second === undefined) {
          return new Date(year, month - 1, _date, hour, minute);
        }

        return new Date(year, month - 1, _date, hour, minute, second);
      } else {
        const dateTime = Date.parse(date);
        if (isNaN(dateTime)) {
          throw new InvalidDateError(`string '${date}'is not date string`);
        }

        return new Date(dateTime);
      }
    }

    throw new InvalidDateError(`${format} is not invalid format`);
  }
}

export = (date?: string | Date | number, format?: string): Dtil => new Dtil(date, format);