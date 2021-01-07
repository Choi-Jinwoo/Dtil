# Installing

Using npm
```
$ npm install dtil
```

Using yarn
```
$ yarn add dtil
```


# Example

## Import

You can import function. Imported function return `Dtil` class object.

### ES5
```javascript
const dtil = require('dtil');

const aDtil = dtil('2020-08-28'); // Date string
const bDtil = dtil(new Date('2020-08-28')); // Date object
const cDtil = dtil(new Date('2020-08-28').getTime()); // number
```

### ES6
```javascript
import dtil from 'dtil';

const aDtil = dtil('2020-08-28'); // Date string
const bDtil = dtil(new Date('2020-08-28')); // Date object
const cDtil = dtil(new Date('2020-08-28').getTime()); // number
```

## Format

|char|description|
|---|---|
|yyyy / YYYY|year|
|MM|two-digit month |
|M|month|
|dd / DD|two-digit date|
|d / D|date|
|HH|two-digit hour(24)|
|H|hour(24)|
|hh|two-digit hour(12)|
|h|hour(12)|
|mm|two-digit minute|
|m|minute|
|SS / ss|two-digit second|
|S / s|second|

### Usage
```javascript
const dtil = require('dtil');

const date = dtil('2020-08-28');
console.log(date.format('yyyy/MM/dd')); // result: '2020/08/28'
```

## Method

|method|return type|description|
|---|---|---|
|format|string|format date string|
|isSameDate|boolean|check date and param is same date|
|isAfter|boolean|check date is after param|
|isAfterNow|boolean|check date is after now|
|isBefore|boolean|check date is before param|
|isBeforeNow|boolean|check date is before now|