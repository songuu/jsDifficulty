/*
 * @Author: songyu
 * @Date: 2021-07-16 15:15:57
 * @LastEditor: songyu
 * @LastEditTime: 2021-07-16 15:17:25
 */
const genATag = ({ url, text }) => {
  return `<a class="linkified" href=${url} target="_blank" content="${text}">${text}</a>`
}

const parseUrl = (string) => {
  if (!string) {
    return ''
  }
  const matchList = linkifyJs.match(string)
  if (Array.isArray(matchList) && matchList.length > 0) {
    const totalLength = string.length
    let latestIndex = 0
    let result = ''
    if (matchList.length > 0) {
      matchList.forEach((val) => {
        const { index, text, lastIndex, url } = val
        const aTag = genATag({ text, url })
        if (latestIndex === index) {
          result = `${result}${aTag}`
        } else {
          result = `${result}${string.substring(latestIndex, index)}${aTag}`
        }
        latestIndex = lastIndex
      })
    }
    // 拼接最后的字符串
    if (latestIndex < totalLength - 1) {
      result = `${result}${string.substring(latestIndex, totalLength)}`
    }
    return result
  }
  return string
}
