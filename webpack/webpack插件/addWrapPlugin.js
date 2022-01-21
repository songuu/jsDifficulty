/*
 * @Author: songyu
 * @Date: 2021-08-06 10:55:36
 * @LastEditor: songyu
 * @LastEditTime: 2021-08-06 11:02:48
 */
/*
 * 添加额外的插件包裹
 */
const { ConcatSource } = require('webpack-sources')

class MyWrapPlugin {
  constructor(options) {}

  apply(compiler) {
    const onRenderWithEntry = (source, chunk, hash) => {
      const newSource = new ConcatSource()

      newSource.add('var myLib =')
      newSource.add(source)
      newSource.add(`\nconsole.log(myLib)`)

      return newSource
    }

    compiler.hooks.compilation.tap('MyWrapPlugin', (compilation) => {
      const { mainTemplate } = compilation

      mainTemplate.hooks.renderWithEntry.tap('MyWrapPlugin', onRenderWithEntry)

      mainTemplate.hooks.hash.tap('SetVarMainTemplatePlugin', (hash) => { // 自定义变量 写入到hash中间
        hash.update()
      })
    })
  }
}
