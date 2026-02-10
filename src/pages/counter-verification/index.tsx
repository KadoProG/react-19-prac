import { useState } from 'react';
import { CounterComponent } from '../use-sync-external-store/components/CounterComponent';
import { CounterDisplay as SyncCounterDisplay } from '../use-sync-external-store/components/CounterDisplay';
import { CounterExample } from '../jotai/components/CounterExample';
import { CounterDisplay as JotaiCounterDisplay } from '../jotai/components/CounterDisplay';

/**
 * Counter検証ページ
 *
 * 複数のcounter実装を並べて比較・検証できるページです。
 * - useStateを使った基本的なカウンター
 * - useSyncExternalStoreを使ったカウンター
 * - Jotaiを使ったカウンター
 */
export const CounterVerification = () => {
  const [useStateCount, setUseStateCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Counter検証ページ</h1>
          <p className="text-lg text-gray-600">複数のcounter実装を比較・検証できます</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* useState カウンター */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">1. useState カウンター</h2>
            <p className="mb-4 text-sm text-gray-600">
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">useState</code>
              を使用した基本的なカウンター実装です。 コンポーネント内でのみ状態が保持されます。
            </p>
            <div className="mb-4 text-center">
              <div className="text-4xl font-bold text-purple-600">{useStateCount}</div>
              <div className="mt-2 text-sm text-gray-500">現在のカウント</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setUseStateCount((c) => c - 1)}
                className="flex-1 rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              >
                -1
              </button>
              <button
                onClick={() => setUseStateCount(0)}
                className="flex-1 rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
              >
                リセット
              </button>
              <button
                onClick={() => setUseStateCount((c) => c + 1)}
                className="flex-1 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
              >
                +1
              </button>
            </div>
            <div className="mt-4 rounded bg-purple-50 p-3">
              <p className="text-xs text-purple-800">
                <strong>特徴:</strong>{' '}
                コンポーネント内でのみ状態を保持。他のコンポーネントと状態を共有しない。
              </p>
            </div>
          </div>

          {/* useSyncExternalStore カウンター */}
          <div className="space-y-4">
            <CounterComponent />
            <SyncCounterDisplay />
            <div className="rounded bg-blue-50 p-3">
              <p className="text-xs text-blue-800">
                <strong>特徴:</strong> カスタムストアを使用して複数コンポーネント間で状態を共有。
                上のコンポーネントと下のコンポーネントは同じストアを参照しているため、同期されます。
              </p>
            </div>
          </div>

          {/* Jotai カウンター */}
          <div className="space-y-4">
            <CounterExample />
            <JotaiCounterDisplay />
            <div className="rounded bg-green-50 p-3">
              <p className="text-xs text-green-800">
                <strong>特徴:</strong> Jotaiのatomを使用して状態管理。
                上のコンポーネントと下のコンポーネントは同じatomを参照しているため、自動的に同期されます。
              </p>
            </div>
          </div>
        </div>

        {/* 比較表 */}
        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">実装方法の比較</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">実装方法</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">状態の共有</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">複雑さ</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">用途</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">
                    <code className="rounded bg-gray-100 px-2 py-1 text-xs">useState</code>
                  </td>
                  <td className="px-4 py-3 text-gray-600">不可（コンポーネント内のみ）</td>
                  <td className="px-4 py-3 text-gray-600">低</td>
                  <td className="px-4 py-3 text-gray-600">単一コンポーネントの状態管理</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">
                    <code className="rounded bg-blue-100 px-2 py-1 text-xs">
                      useSyncExternalStore
                    </code>
                  </td>
                  <td className="px-4 py-3 text-gray-600">可（カスタムストア）</td>
                  <td className="px-4 py-3 text-gray-600">中</td>
                  <td className="px-4 py-3 text-gray-600">
                    外部ストアとの統合、複数コンポーネント間の状態共有
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <code className="rounded bg-green-100 px-2 py-1 text-xs">Jotai</code>
                  </td>
                  <td className="px-4 py-3 text-gray-600">可（atom）</td>
                  <td className="px-4 py-3 text-gray-600">低〜中</td>
                  <td className="px-4 py-3 text-gray-600">
                    グローバル状態管理、複数コンポーネント間の状態共有
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
