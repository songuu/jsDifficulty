const merge = createAssigner((object, source, srcIndex) => {
  baseMerge(object, source, srcIndex)
})

function createAssigner(assigner) {
  return (object, ...sources) => {
    let index = -1
    // rest语法，判断参数多少 => 0
    let length = sources.length
    // 只会执行一次

    // 省略中间部分.....
    while (++index < length) {
      // 执行复制函数
      assigner()
    }
    return object
  }
}

function baseMerge(object, source, srcIndex, customizer, stack) {
  // 如果输入与源相同就return
  if (object === source) {
    return
  }
  // 对于传入的object遍历每一个key
  baseFor(
    source,
    (srcValue, key) => {
      // 如果是引用类型,就构造一个栈防止成环
      if (isObject(srcValue)) {
        // 形成统一的stack
        stack || (stack = new Stack())
        // clone
        baseMergeDeep(
          object,
          source,
          key,
          srcIndex,
          baseMerge,
          customizer,
          stack
        )
      } else {
        // 值复制拷贝
        assignMergeValue(object, key, newValue)
      }
    },
    keysIn
  )
}

function assignMergeValue(object, key, value) {
  // 这里存在赋值规则，如果相同的值不为undefined并且相同不做复制 || 值为undefined但是对应的key已经在对象里了不做复制
  if (
    (value !== undefined && !eq(object[key], value)) ||
    (value === undefined && !(key in object))
  ) {
    // 复制
    baseAssignValue(object, key, value)
  }
}

function baseMergeDeep(
  object,
  source,
  key,
  srcIndex,
  mergeFunc,
  customizer,
  stack
) {
  const objValue = object[key]
  const srcValue = source[key]
  const stacked = stack.get(srcValue)
  // 如果在栈保存的就直接assign
  if (stacked) {
    // 复制对应引用
    assignMergeValue(object, key, stacked)
    return
  }
  const isArr = Array.isArray(srcValue)
  if (isArr) {
    if (Array.isArray(objValue)) {
      newValue = objValue
    } else if (isArrayLikeObject(objValue)) {
      // 遍历拷贝
      newValue = copyArray(objValue)
    } else {
      newValue = []
    }
  }
  // 如果是object或者argument的话
  else if (isPlainObject(srcValue) || isArguments(srcValue)) {
    newValue = objValue
    if (isArguments(objValue)) {
      newValue = toPlainObject(objValue)
    } else if (typeof objValue === 'function' || !isObject(objValue)) {
      newValue = initCloneObject(srcValue)
    }
  }
  // Recursively merge objects and arrays (susceptible to call stack  limits).
  stack.set(srcValue, newValue)
  stack['delete'](srcValue)
  assignMergeValue(object, key, newValue)
}
