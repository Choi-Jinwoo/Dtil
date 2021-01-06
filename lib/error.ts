export class InvalidDateError implements Error {
  name: string = 'Invalid Date Error';
  message: string;
  stack?: string;

  constructor(message: string) {
    this.message = message;
  }
}
