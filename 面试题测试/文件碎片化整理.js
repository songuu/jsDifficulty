// 为了⽅便测试，我改成每5秒扫⼀次， 过期1分钟的删除做演示
const fse = require('fs-extra')
const path = require('path')
const schedule = require('nodeschedule')
// 空⽬录删除
function remove(file, stats) {
    const now = new Date().getTime()
    const offset = now - stats.ctimeMs
    if (offset > 1000 * 60) {
        // ⼤于60秒的碎⽚
        console.log(file, '过期了，浪费空间，删除')
        fse.unlinkSync(file)
    }
}
async function scan(dir, callback) {
    const files = fse.readdirSync(dir)
    files.forEach(filename => {
        const fileDir = path.resolve(dir, filename)
        const stats = fse.statSync(fileDir)
        if (stats.isDirectory()) {
            return scan(fileDir, remove)
        }
        if (callback) {
            callback(fileDir, stats)
        }
    })
}

let start = function (UPLOAD_DIR) {
    // 每5秒
    schedule.scheduleJob("*/5 * * * * * ", function () {
        console.log('开始扫描')
        scan(UPLOAD_DIR)
    })
}

exports.start = start