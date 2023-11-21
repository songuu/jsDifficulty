// * 节点的类型
export const ELEMENT_TEXT = Symbol.for("ELEMENT_TEXT"); // 文本元素

export const TAG_ROOT = Symbol.for("TAG_ROOT"); // react 根

export const TAG_HOST = Symbol.for("TAG_HOST"); // 原始dom节点

export const TAG_TEXT = Symbol.for("TAG_TEXT"); // 文本节点

export const TAG_CLASS = Symbol.for("TAG_CLASS"); // 类组件

export const FRAGMENT = Symbol.for("FRAGMENT"); // fragment 

export const FORWARDREF = Symbol.for("FORWARDREF"); // forwardRef

export const HOSTPORTAL = Symbol.for("HOSTPORTAL"); // HostPortal

// * fiber操作的类型
export const PLACEMENT = Symbol.for("PLACEMENT");  // 插入
 
export const UPDATE = Symbol.for("UPDATE"); // 更新

export const DELETION = Symbol.for("DELETEION"); // 删除