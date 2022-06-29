var charCodes = [
  '3c',
  '3e',
  '27',
  '22',
  '28',
  '29',
  '60',
  { format: 'script{}', chr: '3a' },
] //要转义字符的16进制ASCII码[1<  2>  3'  4"  5(  6)  7`]
var xssChars = [],
  filterChars = [],
  tmpFormat = '{}',
  tmpChr
for (var i = 0; i < charCodes.length; i++) {
  if ('string' == typeof charCodes[i]) {
    tmpFormat = '{}'
    tmpChr = charCodes[i]
  } else {
    tmpFormat = charCodes[i].format
    tmpChr = charCodes[i].chr
  }
  xssChars.push(tmpFormat.replace('{}', '\\u00' + tmpChr))
  xssChars.push(tmpFormat.replace('{}', '%' + tmpChr)) //1次encode
  xssChars.push(tmpFormat.replace('{}', '%25' + tmpChr)) //2次encode
  filterChars.push(tmpFormat.replace('{}', '&#x' + tmpChr + ';'))
  filterChars.push(tmpFormat.replace('{}', '%26%23x' + tmpChr + '%3B')) //1次encode
  filterChars.push(tmpFormat.replace('{}', '%2526%2523x' + tmpChr + '%253B')) //2次encode
}

console.log(xssChars)
console.log(filterChars)
