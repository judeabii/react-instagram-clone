var previousDate = new Date();
previousDate.setDate(previousDate.getDate() - 1);

var day = previousDate.getDate();
var month = previousDate.getMonth() + 1
var year = previousDate.getFullYear();

var formattedPreviousDate =
  (day < 10 ? '0' : '') + day + '.' +
  (month < 10 ? '0' : '') + month + '.' +
  year;

console.log(formattedPreviousDate);