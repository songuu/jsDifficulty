/*
 * @Author: songyu
 * @Date: 2021-08-06 11:17:01
 * @LastEditor: songyu
 * @LastEditTime: 2021-08-06 11:26:04
 */
/*
 *按需引入的原理
 */

// * 试用场景
import { test } from './b.js'
import MainFunction from './a.js'

MainFunction.use(test) // 检测到试用了b，然后自动插入

// * 按需加载的实现
const path = require('path')
const ConstDependency = require('webpack/lib/dependencies/ConstDependency')
const HarmonyImportSideEffectDependency = require('webpack/lib/dependencies/HarmonyImportSideEffectDependency')
const HarmonyImportSpecifierDependency = require('webpack/lib/dependencies/HarmonyImportSpecifierDependency')

// 要引入的 a.js 的路径。这个路径后面会经过 webpack 的 resolve
const externalJSPath = `${path.join(__dirname, './a.js')}`

class ProvidePlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.compilation.tap(
      'InjectPlugin',
      (compilation, { normalModuleFactory }) => {
        const handler = (parser, parserOptions) => {
          // 在 parser 处理 import 语句的时候
          parser.hooks.import.tap('InjectPlugin', (statement, source) => {
            parser.state.lastHarmonyImportOrder =
              (parser.state.lastHarmonyImportOrder || 0) + 1
            // 新建一个 './a.js' 的依赖
            const sideEffectDep = new HarmonyImportSideEffectDependency(
              externalJSPath,
              parser.state.module,
              parser.state.lastHarmonyImportOrder,
              parser.state.harmonyParserScope
            )
            // 为 dependency 设置一个位置。这里设置为和 import { test } from './b.js' 相同的位置，在代码进行插入的时候会插入到改句所在的地方。
            sideEffectDep.loc = {
              start: statement.start,
              end: statement.end,
            }
            // 设置一下 renames，标识代码中 mainFunction 是从外部引入的
            parser.scope.renames.set('mainFunction', 'imported var')
            // 把这个依赖加入到 module 的依赖中
            parser.state.module.addDependency(sideEffectDep)

            // -------------处理插入 mainFunction.use(test)------------
            if (!parser.state.harmonySpecifier) {
              parser.state.harmonySpecifier = new Map()
            }
            parser.state.harmonySpecifier.set('mainFunction', {
              source: externalJSPath,
              id: 'default',
              sourceOrder: parser.state.lastHarmonyImportOrder,
            })
            // 针对 mainFunction.use 中的 mainFunction
            const mainFunction = new HarmonyImportSpecifierDependency(
              externalJSPath,
              parser.state.module,
              -1,
              parser.state.harmonyParserScope,
              'default',
              'mainFunction',
              [-1, -1], // 插入到代码最开始
              false
            )
            parser.state.module.addDependency(mainFunction)

            // 插入代码片段 .use(
            const constDep1 = new ConstDependency('.use(', -1, true)
            parser.state.module.addDependency(constDep1)

            // 插入代码片段 test
            const useArgument = new HarmonyImportSpecifierDependency(
              source,
              parser.state.module,
              -1,
              parser.state.harmonyParserScope,
              'test',
              'test',
              [-1, -1],
              false
            )
            parser.state.module.addDependency(useArgument)

            // 插入代码片段 )
            const constDep2 = new ConstDependency(')\n', -1, true)
            parser.state.module.addDependency(constDep2)
          })
        }
        normalModuleFactory.hooks.parser
          .for('javascript/auto')
          .tap('ProvidePlugin', handler)
        normalModuleFactory.hooks.parser
          .for('javascript/dynamic')
          .tap('ProvidePlugin', handler)
      }
    )
  }
}
module.exports = ProvidePlugin
