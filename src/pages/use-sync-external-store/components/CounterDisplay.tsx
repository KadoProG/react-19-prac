import { useSyncExternalStore } from 'react';
import { counterStore } from '../stores';

/**
 * カウンター表示コンポーネント
 *
 * CounterComponent とは別ファイルですが、同じ counterStore インスタンスを
 * 使用しているため、状態が同期されます。
 */
export const CounterDisplay = () => {
  const count = useSyncExternalStore(
    counterStore.subscribe.bind(counterStore),
    counterStore.getState.bind(counterStore)
  );

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-700">別コンポーネント: {count}</div>
        <div className="mt-1 text-xs text-blue-600">同じストアを参照しています</div>
      </div>
    </div>
  );
};
