import { useAtom } from 'jotai';
import { countAtom } from '../atoms';

/**
 * 基本的なカウンターの例
 *
 * useAtomフックを使用してatomの値を読み書きします。
 * 複数のコンポーネントで同じatomを使用すると、状態が自動的に共有されます。
 */
export const CounterExample = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">1. 基本的なカウンター</h2>
      <p className="mb-4 text-sm text-gray-600">
        <code className="rounded bg-gray-100 px-2 py-1 text-xs">useAtom</code>
        を使用してatomの値を読み書きします。
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          -1
        </button>
        <div className="min-w-[100px] text-center">
          <span className="text-2xl font-bold text-gray-900">{count}</span>
        </div>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          +1
        </button>
        <button
          onClick={() => setCount(0)}
          className="rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          リセット
        </button>
      </div>
    </div>
  );
};
