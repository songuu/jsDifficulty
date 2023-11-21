import {useEffect, useState} from 'react'

import { on, off } from './useEvent';

export const isBrowser = typeof window !== 'undefined';

export const isNavigator = typeof navigator !== 'undefined';

export interface INetworkInformation extends EventTarget {
    readonly downlink: number;
    readonly downlinkMax: number;
    readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    readonly rtt: number;
    readonly saveData: boolean;
    readonly type:
      | 'bluetooth'
      | 'cellular'
      | 'ethernet'
      | 'none'
      | 'wifi'
      | 'wimax'
      | 'other'
      | 'unknown';
  
    onChange: (event: Event) => void;
  }

  export interface IUseNetworkState {
    /**
     * @desc 是否在线
     */
    online: boolean | undefined;
    /**
     * @desc 上一个状态
     */
    previous: boolean | undefined;
    /**
     * @desc 改变时间
     */
    since: Date | undefined;
    /**
     * @desc 下行
     */
    downlink: INetworkInformation['downlink'] | undefined;
    /**
     * @desc 最大下行
     */
    downlinkMax: INetworkInformation['downlinkMax'] | undefined;
    /**
     * @desc 影响类型
     */
    effectiveType: INetworkInformation['effectiveType'] | undefined;
    /**
     * @desc 延迟
     */
    rtt: INetworkInformation['rtt'] | undefined;
    /**
     * @desc 使用了用户代理
     */
    saveData: INetworkInformation['saveData'] | undefined;
    /**
     * @desc 网络类型
     */
    type: INetworkInformation['type'] | undefined;
  }


const nav:
  | (Navigator &
      Partial<Record<'connection' | 'mozConnection' | 'webkitConnection', INetworkInformation>>)
  | undefined = isNavigator ? navigator : undefined;

const conn: INetworkInformation | undefined =
  nav && (nav.connection || nav.mozConnection || nav.webkitConnection);

function getConnectionState(previousState?: IUseNetworkState): IUseNetworkState {
  const online = nav?.onLine;
  const previousOnline = previousState?.online;

  return {
    online,
    previous: previousOnline,
    since: online !== previousOnline ? new Date() : previousState?.since,
    downlink: conn?.downlink,
    downlinkMax: conn?.downlinkMax,
    effectiveType: conn?.effectiveType,
    rtt: conn?.rtt,
    saveData: conn?.saveData,
    type: conn?.type,
  };
}

/* 
* 监听网络的状态
*/

export default function useNetwork(
    initialState?: IUseNetworkState
  ): IUseNetworkState {
    const [state, setState] = useState(initialState ?? getConnectionState);
  
    useEffect(() => {
      const handleStateChange = () => {
        setState(getConnectionState);
      };
  
      on(window, 'online', handleStateChange, { passive: true });
      on(window, 'offline', handleStateChange, { passive: true });
  
      if (conn) {
        on(conn, 'change', handleStateChange, { passive: true });
      }
  
      return () => {
        off(window, 'online', handleStateChange);
        off(window, 'offline', handleStateChange);
  
        if (conn) {
          off(conn, 'change', handleStateChange);
        }
      };
    }, []);
  
    return state;
  }