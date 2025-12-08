import { useAtomValue, atom } from 'jotai';
import { countAtom } from '../atoms';

/**
 * Derived Atom（計算されたatom）の例
 *
 * Derived atomは、他のatomの値に基づいて計算された値を返します。
 * 依存するatomの値が変更されると、自動的に再計算されます。
 */

// countAtomの2倍の値を返すderived atom
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// countAtomの3倍の値を返すderived atom
const tripleCountAtom = atom((get) => get(countAtom) * 3);

// 複数のatomに依存するderived atomの例
const sumAtom = atom((get) => get(doubleCountAtom) + get(tripleCountAtom));

export const DerivedAtomExample = () => {
  const count = useAtomValue(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  const tripleCount = useAtomValue(tripleCountAtom);
  const sum = useAtomValue(sumAtom);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        3. Derived Atom（計算されたatom）
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        Derived atomは、他のatomの値に基づいて計算された値を返します。
        依存するatomの値が変更されると、自動的に再計算されます。
      </p>

      <div className="space-y-3">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-gray-600">元の値</div>
          <div className="text-2xl font-bold text-gray-900">{count}</div>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <div className="text-sm text-blue-600">2倍の値 (derived atom)</div>
          <div className="text-2xl font-bold text-blue-900">{doubleCount}</div>
          <code className="mt-1 block text-xs text-blue-700">
            const doubleCountAtom = atom((get) =&gt; get(countAtom) * 2)
          </code>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <div className="text-sm text-green-600">3倍の値 (derived atom)</div>
          <div className="text-2xl font-bold text-green-900">{tripleCount}</div>
          <code className="mt-1 block text-xs text-green-700">
            const tripleCountAtom = atom((get) =&gt; get(countAtom) * 3)
          </code>
        </div>

        <div className="rounded-lg bg-purple-50 p-4">
          <div className="text-sm text-purple-600">合計 (複数のderived atomに依存)</div>
          <div className="text-2xl font-bold text-purple-900">{sum}</div>
          <code className="mt-1 block text-xs text-purple-700">
            const sumAtom = atom((get) =&gt; get(doubleCountAtom) + get(tripleCountAtom))
          </code>
        </div>
      </div>
    </div>
  );
};
