let startDate = '2022-02-05'
let endDate = '2024-03-07'


let startDay = parseInt(startDate.substring(8))
let startMonth = parseInt(startDate.substring(5,7))
let startYear = parseInt(startDate.substring(0,4))

let endDay = parseInt(endDate.substring(8))
let endMonth = parseInt(endDate.substring(5,7))
let endYear = parseInt(endDate.substring(0,4))

let dayReg = getDateRegex(1, 31)
let monthReg = getDateRegex(1, 12)
let yearReg

let yearCount = Math.abs(startYear - endYear)

let regex = ''

String.prototype.myDateFormat = function(){
  return this.split('-').reverse().join('/').substring(0, this.length)
}

if(startYear === endYear){
  let monthCount = Math.abs(startMonth - endMonth)
  let dayCount = Math.abs(startDay - endDay)
  if(startMonth === endMonth){
    if(startDay === endDay){
      regex =  '^' + startDate.myDateFormat() + '$'
    } else if(dayCount === 1){
      regex =  '^' + startDate.myDateFormat() + '$|^' + endDate.myDateFormat() + '$'
    } else {
      regex = `^(${getDateRegex(startDay, endDay)}\/` + getDateRegex(startMonth) + '\/' + startYear + ')$'
    }
  } else {
      startDayReg = getDateRegex(startDay, 31)
      endDayReg = getDateRegex(1, endDay)
      let lowerMonthRegex = `^(${startDayReg}\/` + getDateRegex(startMonth) + '\/' + startYear + ')$'
      let upperMonthRegex = `^(${endDayReg}\/` + getDateRegex(endMonth) + '\/' + startYear + ')$'
      if(monthCount === 1){
        regex = lowerMonthRegex + '|' + upperMonthRegex    
      } else {
        monthReg = getDateRegex(startMonth + 1, endMonth -1)
        regex = lowerMonthRegex + '|' + upperMonthRegex + '|' + `^(${dayReg}\/` + monthReg + '\/' + startYear + ')$'
      }
  }
} else {
    startDayReg = getDateRegex(startDay, 31)
    startMonthReg = getDateRegex(startMonth + 1, 12)
    
    endDayReg = getDateRegex(1, endDay)
    endMonthReg = getDateRegex(1, endMonth - 1)

    let lowerMonthRegex = `^(${startDayReg}\/` + getDateRegex(startMonth, startMonth) + '\/' + startYear + ')$'
    let upperMonthRegex = `^(${endDayReg}\/` + getDateRegex(endMonth, endMonth) + '\/' + endYear + ')$'

    let lowerYearRegex = `^(${dayReg}\/` + startMonthReg + '\/' + startYear + ')$'
    let upperYearRegex = `^(${dayReg}\/` + endMonthReg + '\/' + endYear + ')$'

    regex = lowerMonthRegex + '|'  + upperMonthRegex + '|'  + lowerYearRegex + '|'  + upperYearRegex
    if(yearCount > 1) {
      let betweenYearsRegex = getDateRegex(startYear + 1, endYear - 1)
      regex += '|' +`^(${dayReg}\/` + monthReg + '\/' + betweenYearsRegex + ')$' 
    }

}
String.prototype.getDateRegex = function (start, end = 0, incrementer = 0){
  let reg = ''
  if (start < 10) {
    reg = `0${start}{1}`
  } else {
    reg = `${start}{1}` 
  }
  for(let i = start + incrementer + 1; i <= end; i++){
      let reg = ''
  if (start < 10) {
      reg += `|0${i}{1}`
    } else {
      reg += `|${i}{1}` 
    }
  } 
  return '(' + reg + ')'
}

