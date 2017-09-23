// pretty print
const pp = (source, obj) => {
  var date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    now = h + ':' + m + ':' + s + ' <- ' + source
  console.log('%c ' + now, 'color:blue;font-size:15px;')
  if (obj instanceof HTMLElement) {
    console.log(obj)
  } else {
    console.log(JSON.stringify(obj, null, 2))
  }
}

// Checks if String argument consists exclusively of numbers
const isStringOfIntegers = arg => {
  return /^[0-9]+$/.test(arg)
}

module.exports = {}
