import { useAtomValue } from 'jotai';
import { countAtom } from '../atoms';

/**
 * カウンターの表示のみを行うコンポーネント
 *
 * useAtomValueを使用すると、読み取り専用でatomの値を取得できます。
 * このコンポーネントはCounterExampleと同じatomを参照しているため、
 * カウンターの値が変更されると自動的に再レンダリングされます。
 */
export const CounterDisplay = () => {
  const count = useAtomValue(countAtom);

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-blue-800">
        カウンターの表示（別コンポーネント）
      </h2>
      <p className="mb-4 text-sm text-blue-700">
        <code className="rounded bg-blue-100 px-2 py-1 text-xs">useAtomValue</code>
        を使用して読み取り専用で値を取得しています。同じatomを参照しているため、
        カウンターの値が変更されると自動的に更新されます。
      </p>
      <div className="text-center">
        <span className="text-3xl font-bold text-blue-900">{count}</span>
      </div>
    </div>
  );
};
