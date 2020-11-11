export function setYearDaysCount(year){
  let days = [];
  if (year % 4 === 0) {
    days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  return days
}

export function setFormatDate() {
  let d = new Date();
  let day = d.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let year = d.getFullYear();
  console.log(day + ' / ' + month + ' / ' + year);
  return day + ' / ' + month + ' / ' + year
}
