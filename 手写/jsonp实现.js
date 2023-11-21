// * 利用script标签不跨域
function jsonp({ url, data, callback }) {
    const container = document.getElementsByTagName('head')[0];
    const fnName = `jsonp_${new Date().getTime()}`;
    const script = document.createElement('script');
    script.src = `${url}?${objectToQuery(data)}&callback=${fnName}`;
    script.type = 'text/javascript';
    container.appendChild(script);

    return new Promise((resolve, reject) => {

        window[fnName] = function (res) {
            // 很多候选人漏掉clean这块
            container.removeChild(script);
            delete window[fnName];
            resolve(res);
        }

        script.onerror = function () { // 异常处理，也是很多人漏掉的部分
            container.removeChild(script);
            delete window[fnName];
            reject('something error hanppend!');
        }
    })
}