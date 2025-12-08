/**
 * Jotai の使用例
 *
 * Jotaiは、React用の軽量で柔軟な状態管理ライブラリです。
 * atomベースのアプローチを採用しており、シンプルで直感的なAPIを提供します。
 *
 * 主な特徴：
 * 1. Atomベースの状態管理: 各状態が独立したatomとして定義される
 * 2. 自動的な最適化: 必要な時だけ再レンダリングされる
 * 3. TypeScript対応: 完全な型安全性を提供
 * 4. 軽量: バンドルサイズが非常に小さい
 * 5. 柔軟性: プリミティブ型、オブジェクト、配列、非同期処理などに対応
 *
 * 基本的な使い方：
 * 1. atom()で状態を定義
 * 2. useAtom()で読み書き、useAtomValue()で読み取り専用
 * 3. derived atomで他のatomに基づいて計算された値を定義可能
 *
 * ファイル構成：
 * - atoms.ts: すべてのatomの定義
 * - components/: 各サンプルコンポーネント
 * - index.tsx: メインコンポーネント（このファイル）
 */

import { CounterExample } from './components/CounterExample';
import { CounterDisplay } from './components/CounterDisplay';
import { TodoExample } from './components/TodoExample';
import { DerivedAtomExample } from './components/DerivedAtomExample';
import { AsyncAtomExample } from './components/AsyncAtomExample';
import { UseStateVsJotaiExample } from './components/UseStateVsJotaiExample';
import { UseContextVsJotaiExample } from './components/UseContextVsJotaiExample';

export const Jotai = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Jotai の使用例</h1>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p className="mb-4">
              <code className="rounded bg-gray-100 px-2 py-1 text-sm">Jotai</code>
              は、React用の軽量で柔軟な状態管理ライブラリです。atomベースのアプローチを採用しており、
              シンプルで直感的なAPIを提供します。
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Atomベース:</strong> 各状態が独立したatomとして定義される
              </li>
              <li>
                <strong>自動的な最適化:</strong> 必要な時だけ再レンダリングされる
              </li>
              <li>
                <strong>TypeScript対応:</strong> 完全な型安全性を提供
              </li>
              <li>
                <strong>軽量:</strong> バンドルサイズが非常に小さい
              </li>
              <li>
                <strong>柔軟性:</strong> プリミティブ型、オブジェクト、配列、非同期処理などに対応
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 font-semibold text-blue-800">📦 基本的な使い方</p>
              <ol className="list-decimal pl-6 text-sm text-blue-700">
                <li>
                  <code className="rounded bg-blue-100 px-1 py-0.5">atom()</code>
                  で状態を定義
                </li>
                <li>
                  <code className="rounded bg-blue-100 px-1 py-0.5">useAtom()</code>
                  で読み書き、
                  <code className="rounded bg-blue-100 px-1 py-0.5">useAtomValue()</code>
                  で読み取り専用
                </li>
                <li>
                  <code className="rounded bg-blue-100 px-1 py-0.5">atom((get) =&gt; ...)</code>
                  でderived atom（計算されたatom）を定義可能
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <UseStateVsJotaiExample />
          <UseContextVsJotaiExample />
          <CounterExample />
          <CounterDisplay />
          <TodoExample />
          <DerivedAtomExample />
          <AsyncAtomExample />
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">重要なポイント</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong className="text-gray-800">1. Atomの定義:</strong>{' '}
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">atom(initialValue)</code>
              でatomを定義します。初期値を指定できます。
            </div>
            <div>
              <strong className="text-gray-800">2. useAtom vs useAtomValue:</strong>{' '}
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">useAtom</code>
              は読み書き両用、
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">useAtomValue</code>
              は読み取り専用です。パフォーマンス最適化のために適切に使い分けましょう。
            </div>
            <div>
              <strong className="text-gray-800">3. Derived Atom:</strong>{' '}
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                atom((get) =&gt; get(otherAtom) * 2)
              </code>
              のように、他のatomの値に基づいて計算された値を定義できます。依存するatomが変更されると自動的に再計算されます。
            </div>
            <div>
              <strong className="text-gray-800">4. 非同期Atom:</strong>{' '}
              Promiseを返すatomを定義できます。
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">Suspense</code>
              と組み合わせて使用すると、非同期処理を扱いやすくなります。
            </div>
            <div>
              <strong className="text-gray-800">5. 状態の共有:</strong>{' '}
              複数のコンポーネントで同じatomを使用すると、状態が自動的に共有されます。コンポーネントを分割しても状態は正しく共有されます。
            </div>
            <div>
              <strong className="text-gray-800">6. ファイル分割:</strong>{' '}
              atomの定義を別ファイル（atoms.ts）に分離することで、複数のコンポーネントから同じatomをインポートして使用できます。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
