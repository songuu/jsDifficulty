const { Dependency, Template } = require("webpack");

class DemoDependency extends Dependency {
  constructor() {
    super();
  }
}

DemoDependency.Template = class DemoDependencyTemplate extends Template {
  apply(dependency, source) {
    const today = new Date().toLocaleDateString();
    source.insert(
      0,
      `/* hello: world */
/* Date: ${today} */
`
    );
  }
};

module.exports = class DemoPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("DemoPlugin", (compilation) => {
      // 调用 dependencyTemplates ，注册 Dependency 到 Template 的映射
      compilation.dependencyTemplates.set(
        DemoDependency,
        new DemoDependency.Template()
      );
      compilation.hooks.succeedModule.tap("DemoPlugin", (module) => {
        // 模块构建完毕后，插入 DemoDependency 对象
        module.addDependency(new DemoDependency());
      });
    });
  }
};
