import React, {useCallback, useContext, useEffect, useState} from 'react'
import {message, TreeSelect} from 'antd'
import {DataNode} from 'rc-tree-select/lib/interface'
import {isPromise} from 'utils/utils'
import {FormContext} from '../../index'

/** 基础表单树形选择控件属性 */
interface IFormTreeSelectProps {
  /** 表单字段名 */
  name: string
  /** 将要选中的值 */
  selectValue: any
  /** 选中树节点的回调 */
  onSelect: (value: any) => void
  /** 树形选择控件的值 */
  treeData: Promise<DataNode[]> | DataNode[]
}

const FormTreeSelect: React.FC<IFormTreeSelectProps> = props => {
  /** 解构props */
  const {name, selectValue, onSelect} = props
  let treeData = props.treeData
  /** 通过context获取form实例 */
  const {form, closeFlag} = useContext(FormContext)

  const [data, setData] = useState<DataNode[]>([])

  const [value, setValue] = useState<any>()

  /** 打开抽屉时设置初始值，关闭清空值 */
  useEffect(() => {
    if (closeFlag) {
      setValue('')
    } else {
      setValue(selectValue)
    }
  }, [closeFlag, selectValue])

  if (Array.isArray(treeData)) {
    treeData = Promise.resolve(treeData)
  } else if (isPromise(treeData)) {
    treeData = treeData
  } else {
    message.warning('只能传入Promise<DataNode> 或 DataNode[]类型的数组')
    treeData = Promise.resolve([])
  }

  /** 设置树形选择器的值 */
  useEffect(() => {
    ;(treeData as Promise<DataNode[]>).then(res => {
      setData(res)
    })
  }, [treeData])

  /** 更新表单字段值 */
  useEffect(() => {
    form.setFieldsValue({[name]: value})
  }, [value])

  const handleSelect = useCallback(
    (value: any) => {
      setValue(value)
      onSelect && onSelect(value)
    },
    [onSelect, setValue],
  )
  const handleClear = useCallback(() => {
    setValue('')
  }, [selectValue])
  return (
    <TreeSelect
      allowClear
      value={value}
      treeData={data}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  )
}

export default FormTreeSelect
