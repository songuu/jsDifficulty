// * 声明React.createRef() 创建 ref类型
const ref1: React.RefObject<HTMLDivElement> = React.createRef();

const inputRef = React.createRef<Comp>();

// 正常传入
@connect()
class TestScene extends React.Component<Props> {
  inputRef: React.RefObject<Comp>;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef<Comp>();
  }
}

// * 使用@connect装饰器
import {
  ComponenClass
} from "react";

import {
  connect as nativeConnect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from "react-redux";

import {
  withRouter as nativeWithRouter
} from "react-router-dom";

export type ComponentDecorator<P = any> = <T extends ComponentClass<P>>(WrappedComponent: T) = > T

export const connect: <P, S>(
  mapState: MapStateToPropsParam<Partial<P>, P, S>,
  mapDisPatch?: any
) => ComponentDecorator = nativeConnect as any;

export const withRouter: ComponentDecorator = nativeWithRouter as any;
