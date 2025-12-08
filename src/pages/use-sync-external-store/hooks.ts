/**
 * カスタムフック
 *
 * useSyncExternalStore をラップした再利用可能なフック
 */

import { useSyncExternalStore } from 'react';
import { counterStore, windowSizeStore, networkStatusStore } from './stores';

export function useCounter() {
  return useSyncExternalStore(
    counterStore.subscribe.bind(counterStore),
    counterStore.getState.bind(counterStore)
  );
}

export function useWindowSize() {
  return useSyncExternalStore(
    windowSizeStore.subscribe.bind(windowSizeStore),
    windowSizeStore.getState.bind(windowSizeStore)
  );
}

export function useNetworkStatus() {
  return useSyncExternalStore(
    networkStatusStore.subscribe.bind(networkStatusStore),
    networkStatusStore.getState.bind(networkStatusStore)
  );
}
