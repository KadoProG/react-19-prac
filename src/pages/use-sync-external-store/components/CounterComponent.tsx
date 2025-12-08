import { useSyncExternalStore } from 'react';
import { counterStore } from '../stores';

/**
 * カウンターコンポーネント
 *
 * 別ファイルに分割しても、stores.ts から同じ counterStore インスタンスを
 * インポートしているため、状態が共有されます。
 */
export const CounterComponent = () => {
  const count = useSyncExternalStore(
    counterStore.subscribe.bind(counterStore),
    counterStore.getState.bind(counterStore)
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">例1: カスタムカウンターストア</h3>
      <div className="mb-4 text-center">
        <div className="text-4xl font-bold text-blue-600">{count}</div>
        <div className="mt-2 text-sm text-gray-500">現在のカウント</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => counterStore.decrement()}
          className="flex-1 rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          -1
        </button>
        <button
          onClick={() => counterStore.reset()}
          className="flex-1 rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          リセット
        </button>
        <button
          onClick={() => counterStore.increment()}
          className="flex-1 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          +1
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        このカウンターは複数のコンポーネント間で共有されます。下のコンポーネントも同じストアを使用しています。
      </p>
    </div>
  );
};
