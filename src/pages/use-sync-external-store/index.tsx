import { useSyncExternalStore } from 'react';

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
 */

// ============================================================================
// 例1: カスタムカウンターストア
// ============================================================================

type Listener = () => void;

class CounterStore {
  private count = 0;
  private listeners = new Set<Listener>();

  getState() {
    return this.count;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  increment() {
    this.count += 1;
    this.notify();
  }

  decrement() {
    this.count -= 1;
    this.notify();
  }

  reset() {
    this.count = 0;
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

const counterStore = new CounterStore();

// useSyncExternalStore を使用してカウンターストアに接続
const CounterComponent = () => {
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

// 同じストアを使用する別のコンポーネント
const CounterDisplay = () => {
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

// ============================================================================
// 例2: ウィンドウサイズストア（ブラウザ API の監視）
// ============================================================================

class WindowSizeStore {
  private width = typeof window !== 'undefined' ? window.innerWidth : 0;
  private height = typeof window !== 'undefined' ? window.innerHeight : 0;
  private listeners = new Set<Listener>();
  private cachedState = { width: 0, height: 0 };

  constructor() {
    if (typeof window !== 'undefined') {
      this.cachedState = { width: window.innerWidth, height: window.innerHeight };
      window.addEventListener('resize', this.handleResize);
    }
  }

  getState() {
    // 値が変わった場合のみ新しいオブジェクトを作成
    if (this.cachedState.width !== this.width || this.cachedState.height !== this.height) {
      this.cachedState = { width: this.width, height: this.height };
    }
    return this.cachedState;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.notify();
  };

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  cleanup() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }
}

const windowSizeStore = new WindowSizeStore();

const WindowSizeComponent = () => {
  const { width, height } = useSyncExternalStore(
    windowSizeStore.subscribe.bind(windowSizeStore),
    windowSizeStore.getState.bind(windowSizeStore)
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">例2: ウィンドウサイズストア</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded bg-gray-50 p-3">
          <span className="text-gray-700">幅:</span>
          <span className="font-mono font-semibold text-gray-900">{width}px</span>
        </div>
        <div className="flex items-center justify-between rounded bg-gray-50 p-3">
          <span className="text-gray-700">高さ:</span>
          <span className="font-mono font-semibold text-gray-900">{height}px</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        ウィンドウサイズを変更すると、自動的に更新されます。ブラウザ API を監視する例です。
      </p>
    </div>
  );
};

// ============================================================================
// 例3: ネットワーク状態ストア
// ============================================================================

class NetworkStatusStore {
  private online = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private listeners = new Set<Listener>();
  private cachedState = { online: true };

  constructor() {
    if (typeof window !== 'undefined') {
      this.cachedState = { online: navigator.onLine };
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  getState() {
    // 値が変わった場合のみ新しいオブジェクトを作成
    if (this.cachedState.online !== this.online) {
      this.cachedState = { online: this.online };
    }
    return this.cachedState;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private handleOnline = () => {
    this.online = true;
    this.notify();
  };

  private handleOffline = () => {
    this.online = false;
    this.notify();
  };

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  cleanup() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOffline);
    }
  }
}

const networkStatusStore = new NetworkStatusStore();

const NetworkStatusComponent = () => {
  const { online } = useSyncExternalStore(
    networkStatusStore.subscribe.bind(networkStatusStore),
    networkStatusStore.getState.bind(networkStatusStore)
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">例3: ネットワーク状態ストア</h3>
      <div className="flex items-center gap-3">
        <div className={`h-4 w-4 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="font-medium text-gray-700">{online ? 'オンライン' : 'オフライン'}</span>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        ネットワーク接続状態を監視します。ブラウザの開発者ツールでネットワークを無効化すると、状態が更新されます。
      </p>
    </div>
  );
};

// ============================================================================
// 例4: カスタムフックとしての抽象化
// ============================================================================

// useSyncExternalStore をラップしたカスタムフック
function useCounter() {
  return useSyncExternalStore(
    counterStore.subscribe.bind(counterStore),
    counterStore.getState.bind(counterStore)
  );
}

function useWindowSize() {
  return useSyncExternalStore(
    windowSizeStore.subscribe.bind(windowSizeStore),
    windowSizeStore.getState.bind(windowSizeStore)
  );
}

function useNetworkStatus() {
  return useSyncExternalStore(
    networkStatusStore.subscribe.bind(networkStatusStore),
    networkStatusStore.getState.bind(networkStatusStore)
  );
}

// カスタムフックを使用したコンポーネント
const CustomHookExample = () => {
  const count = useCounter();
  const { width, height } = useWindowSize();
  const { online } = useNetworkStatus();

  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-purple-800">
        例4: カスタムフックとしての抽象化
      </h3>
      <div className="space-y-3">
        <div className="rounded bg-white p-3">
          <div className="text-sm text-gray-600">カウンター</div>
          <div className="text-xl font-bold text-purple-700">{count}</div>
        </div>
        <div className="rounded bg-white p-3">
          <div className="text-sm text-gray-600">ウィンドウサイズ</div>
          <div className="text-xl font-bold text-purple-700">
            {width} × {height}
          </div>
        </div>
        <div className="rounded bg-white p-3">
          <div className="text-sm text-gray-600">ネットワーク</div>
          <div className="text-xl font-bold text-purple-700">
            {online ? 'オンライン' : 'オフライン'}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-purple-700">
        カスタムフックとして抽象化することで、再利用性と可読性が向上します。
      </p>
    </div>
  );
};

// ============================================================================
// メインコンポーネント
// ============================================================================

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
          </div>
        </div>
      </div>
    </div>
  );
};
