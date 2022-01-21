/*
 * @Author: songyu
 * @Date: 2021-08-06 10:46:39
 * @LastEditor: songyu
 * @LastEditTime: 2021-08-06 10:56:51
 */
/*
 * 添加额外的信息
 */
const { ConcatSource } = reuqire('webpack-sources') // 拼接资源到chunk源码中间

class AddExternal {
  constructor(options) {
    this.content = options.content // 需要添加的内容
  }

  apply(compiler) {
    const content = this.content
    compiler.hooks.compilation.tap('AddExternal', (compilation) => {
      compilation.moduleTemplates.javascript.hooks.render.tap(
        'AddExternal',
        (moduleSource, module) => {
          // 传入module 配置指定某一具体的module
          const source = new ConcatSource()

          // 插入添加内容
          source.add(content)

          // 插入源码内容
          source.add(moduleSource)

          // 最新的源码
          return source
        }
      )
    })
  }
}
