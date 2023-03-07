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

