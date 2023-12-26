// * 利用script标签不跨域
function jsonp({ url, data, callback }) {
  const container = document.getElementsByTagName('head')[0]
  const fnName = `jsonp_${new Date().getTime()}`
  const script = document.createElement('script')
  script.src = `${url}?${objectToQuery(data)}&callback=${fnName}`
  script.type = 'text/javascript'
  container.appendChild(script)

  return new Promise((resolve, reject) => {
    window[fnName] = function (res) {
      // 很多候选人漏掉clean这块
      container.removeChild(script)
      delete window[fnName]
      resolve(res)
    }

    script.onerror = function () {
      // 异常处理，也是很多人漏掉的部分
      container.removeChild(script)
      delete window[fnName]
      reject('something error hanppend!')
    }
  })
}

function jsonp1(url, params = {}, callback, timeout = 5000) {
  let queryString = url.indexOf('?') === -1 ? '?' : '&'
  queryString += 'callback=CALLBACK_FUNCTION'

  // 添加额外的查询参数
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      queryString += `&${encodeURIComponent(key)}=${encodeURIComponent(
        params[key]
      )}`
    }
  }

  // 创建一个唯一的回调函数名
  const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random())
  window[callbackName] = function (data) {
    clearTimeout(timeoutId)
    document.body.removeChild(script)
    callback(null, data)
  }

  // 错误处理
  const handleError = (errorType) => {
    clearTimeout(timeoutId)
    document.body.removeChild(script)
    callback(new Error(`JSONP request to ${url} failed: ${errorType}`), null)
  }

  // 设置超时处理
  const timeoutId = setTimeout(() => {
    handleError('timeout')
  }, timeout)

  // 替换回调函数名
  queryString = queryString.replace('CALLBACK_FUNCTION', callbackName)

  // 创建并添加<script>标签
  const script = document.createElement('script')
  script.src = url + queryString
  script.onerror = () => handleError('script error')
  document.body.appendChild(script)
}

// 使用示例
jsonp(
  'https://example.com/api/data',
  { param1: 'value1' },
  (err, data) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('Received data:', data)
    }
  },
  10000
) // 设置10秒超时
