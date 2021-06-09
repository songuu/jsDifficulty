/*
 * @Author: songyu
 * @Date: 2021-06-09 20:30:04
 * @LastEditTime: 2021-06-09 20:36:47
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\手写\手写vue.use.js
 */
/* 
    1. 首先需要传递一个plugin参数
    2. 需要判断插件是不是已经注册过了
*/
class Vue {
    _installedPlugins = []
}

Vue.use = function (plugin) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))

    // * 防止插件的重载
    if (installedPlugins.includes(plugin)) {
        return this;
    }

    const args = toArray(arguments, 1);

    args.unshift(this);

    // * plugin参数支持函数或者对象类型
    if (typeof plugin.install === "function") {
        plugin.install.apply(plugin, args)
    } else if (typeof plugin === "function") {
        plugin.apply(null, plugin, args)
    }

    installedPlugins.push(plugin)

    return this;
}