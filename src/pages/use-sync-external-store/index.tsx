/**
 * useSyncExternalStore の使用例
 *
 * useSyncExternalStore は、外部ストア（Redux、Zustand、カスタムストアなど）を
 * React コンポーネントに統合するためのフックです。
 *
 * 主な特徴：
 * 1. 外部ストアの変更を React コンポーネントに同期させる
 * 2. サブスクリプションベースのストアと統合できる
 * 3. サーバーサイドレンダリング（SSR）でも安全に使用できる
 * 4. 複数のコンポーネント間で同じストアの状態を共有できる
 *
 * 使用するタイミング：
 * 1. 外部状態管理ライブラリ（Redux、Zustand など）と統合する場合
 * 2. ブラウザ API（window サイズ、ネットワーク状態など）を監視する場合
 * 3. サブスクリプションベースのストア（WebSocket、EventEmitter など）と統合する場合
 * 4. 複数のコンポーネント間で状態を共有する必要がある場合
 *
 * ファイル構成：
 * - stores.ts: ストアの定義とシングルトンインスタンス
 * - hooks.ts: カスタムフック（useCounter, useWindowSize, useNetworkStatus）
 * - components/: 各コンポーネントを分割
 * - index.tsx: メインコンポーネント（このファイル）
 *
 * 重要なポイント：
 * ストアのインスタンスをエクスポートすることで、複数のファイルから
 * 同じストアインスタンスを共有できます。これにより、コンポーネントを
 * 分割しても状態が正しく共有されます。
 */

import { CounterComponent } from './components/CounterComponent';
import { CounterDisplay } from './components/CounterDisplay';
import { WindowSizeComponent } from './components/WindowSizeComponent';
import { NetworkStatusComponent } from './components/NetworkStatusComponent';
import { CustomHookExample } from './components/CustomHookExample';

export const UseSyncExternalStore = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">useSyncExternalStore の使用例</h1>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p className="mb-4">
              <code className="rounded bg-gray-100 px-2 py-1 text-sm">useSyncExternalStore</code>{' '}
              は、外部ストアを React コンポーネントに統合するためのフックです。
            </p>
            <ul className="list-disc pl-6">
              <li>外部状態管理ライブラリ（Redux、Zustand など）と統合</li>
              <li>ブラウザ API（ウィンドウサイズ、ネットワーク状態など）の監視</li>
              <li>サブスクリプションベースのストアとの統合</li>
              <li>複数のコンポーネント間での状態共有</li>
            </ul>
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 font-semibold text-blue-800">📁 ファイル分割について</p>
              <p className="text-sm text-blue-700">
                このページのコンポーネントは複数のファイルに分割されていますが、
                すべてのコンポーネントが同じストアインスタンス（stores.ts からエクスポート）を
                使用しているため、状態が正しく共有されます。
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <CounterComponent />
          <CounterDisplay />
          <WindowSizeComponent />
          <NetworkStatusComponent />
          <CustomHookExample />
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">重要なポイント</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong className="text-gray-800">1. subscribe 関数:</strong>{' '}
              ストアの変更を監視する関数を登録し、クリーンアップ関数を返す必要があります。
            </div>
            <div>
              <strong className="text-gray-800">2. getSnapshot 関数:</strong>{' '}
              ストアの現在の状態を取得する関数です。
              <span className="mt-1 block text-red-600">
                ⚠️ 重要: オブジェクトを返す場合は、値が変わらない限り同じ参照を返す必要があります。
                毎回新しいオブジェクトを作成すると無限ループが発生します。
              </span>
            </div>
            <div>
              <strong className="text-gray-800">3. SSR 対応:</strong>{' '}
              サーバーサイドレンダリングでも安全に使用できます（getServerSnapshot を提供可能）。
            </div>
            <div>
              <strong className="text-gray-800">4. パフォーマンス:</strong>{' '}
              必要な時だけ再レンダリングされるため、効率的です。
            </div>
            <div>
              <strong className="text-gray-800">5. ファイル分割:</strong>{' '}
              ストアのインスタンスをエクスポートすることで、複数のファイルから同じストアを
              共有できます。コンポーネントを分割しても状態は正しく共有されます。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
