/**
 * ストア定義
 *
 * これらのストアはシングルトンインスタンスとしてエクスポートされ、
 * 複数のコンポーネント間で共有されます。
 */

type Listener = () => void;

// ============================================================================
// カウンターストア
// ============================================================================

export class CounterStore {
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

// シングルトンインスタンスをエクスポート
export const counterStore = new CounterStore();

// ============================================================================
// ウィンドウサイズストア
// ============================================================================

export class WindowSizeStore {
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

// シングルトンインスタンスをエクスポート
export const windowSizeStore = new WindowSizeStore();

// ============================================================================
// ネットワーク状態ストア
// ============================================================================

export class NetworkStatusStore {
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

// シングルトンインスタンスをエクスポート
export const networkStatusStore = new NetworkStatusStore();
