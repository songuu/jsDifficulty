import { string } from 'vue-types';

// 参数设置
interface ArgsProps {}

// 配置设置
interface ConfigProps {}

// ModalFunc 提示确认框
interface ModalFunc {}

// 提示的类型
export interface messageOptionsEx {
  type: 'warning' | 'warn' | 'success' | 'error' | 'info';
  content: string;
}

// message提示类型和操作
export interface MessageApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(config: ArgsProps): void;
  close(key: string): void;
  config(options: ConfigProps): void;
  destroy(): void;
}

// notify提示类型和操作
export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(args: ArgsProps): void;
  close(key: String): void;
  config(options: ConfigProps): void;
  destroy(): void;
}

// confirm确认提示
interface ConfirmApi {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}

// 通过传入的类型进行提示
// 暂时只考虑直接提示
function getType(type: string) {
  return type;
  switch (type) {
    case 'warn':
      break;
    case 'warning':
      break;
    case 'info':
      break;
    case 'error':
      break;
    case 'warn':
      break;
    case 'success':
      break;
    default:
      break;
  }
}

/**
 * @description: 创建message盒子
 */
function createMessage(options: messageOptionsEx) {
  const type = options.type || 'success';
  console[getType(type)](options?.content ?? '');
  // return;
}

/**
 * @description: 创建notify盒子
 */
function createNotify(options: messageOptionsEx) {
  const type = options.type || 'success';
  console[getType(type)](options?.content ?? '');
  // return;
}

/**
 * @description: 提示
 */
export function useMessage() {
  return {
    createMessage: createMessage,
    createNotify: createNotify,
  };
}
