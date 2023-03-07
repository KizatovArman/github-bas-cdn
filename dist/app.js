

console.log(getDateRegex('2022-02-05', '2024-03-07'))

String.prototype.myDateFormat = function(){
  return this.split('-').reverse().join('/').substring(0, this.length)
}


function getDateRegex(startDate, endDate){
  let startDay = parseInt(startDate.substring(8))
  let startMonth = parseInt(startDate.substring(5,7))
  let startYear = parseInt(startDate.substring(0,4))

  let endDay = parseInt(endDate.substring(8))
  let endMonth = parseInt(endDate.substring(5,7))
  let endYear = parseInt(endDate.substring(0,4))

  let dayReg = getSubDateRegex(1, 31)
  let monthReg = getSubDateRegex(1, 12)
  let yearReg

  let yearCount = Math.abs(startYear - endYear)

  let regex = ''
  if(startYear === endYear){
  let monthCount = Math.abs(startMonth - endMonth)
  let dayCount = Math.abs(startDay - endDay)
  if(startMonth === endMonth){
    if(startDay === endDay){
      regex =  '^' + startDate.myDateFormat() + '$'
    } else if(dayCount === 1){
      regex =  '^' + startDate.myDateFormat() + '$|^' + endDate.myDateFormat() + '$'
    } else {
      regex = `^(${getSubDateRegex(startDay, endDay)}\/` + getSubDateRegex(startMonth) + '\/' + startYear + ')$'
    }
  } else {
      startDayReg = getSubDateRegex(startDay, 31)
      endDayReg = getSubDateRegex(1, endDay)
      let lowerMonthRegex = `^(${startDayReg}\/` + getSubDateRegex(startMonth) + '\/' + startYear + ')$'
      let upperMonthRegex = `^(${endDayReg}\/` + getSubDateRegex(endMonth) + '\/' + startYear + ')$'
      if(monthCount === 1){
        regex = lowerMonthRegex + '|' + upperMonthRegex    
      } else {
        monthReg = getSubDateRegex(startMonth + 1, endMonth -1)
        regex = lowerMonthRegex + '|' + upperMonthRegex + '|' + `^(${dayReg}\/` + monthReg + '\/' + startYear + ')$'
      }
  }
} else {
    startDayReg = getSubDateRegex(startDay, 31)
    startMonthReg = getSubDateRegex(startMonth + 1, 12)
    
    endDayReg = getSubDateRegex(1, endDay)
    endMonthReg = getSubDateRegex(1, endMonth - 1)

    let lowerMonthRegex = `^(${startDayReg}\/` + getSubDateRegex(startMonth, startMonth) + '\/' + startYear + ')$'
    let upperMonthRegex = `^(${endDayReg}\/` + getSubDateRegex(endMonth, endMonth) + '\/' + endYear + ')$'

    let lowerYearRegex = `^(${dayReg}\/` + startMonthReg + '\/' + startYear + ')$'
    let upperYearRegex = `^(${dayReg}\/` + endMonthReg + '\/' + endYear + ')$'

    regex = lowerMonthRegex + '|'  + upperMonthRegex + '|'  + lowerYearRegex + '|'  + upperYearRegex
    if(yearCount > 1) {
      let betweenYearsRegex = getSubDateRegex(startYear + 1, endYear - 1)
      regex += '|' +`^(${dayReg}\/` + monthReg + '\/' + betweenYearsRegex + ')$' 
    }

  }
    return regex
}

function getSubDateRegex(start, end = 0, incrementer = 0){
  let reg = start < 10 ? `0${start}{1}`: `${start}{1}`  
  for(let i = start + incrementer + 1; i <= end; i++){
      reg += i < 10 ? `|0${i}{1}`: `|${i}{1}`
  } 
  return '(' + reg + ')'
}

