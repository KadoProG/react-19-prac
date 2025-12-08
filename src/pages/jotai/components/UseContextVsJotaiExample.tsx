import { createContext, useContext, useState, ReactNode } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { atom } from 'jotai';

/**
 * useContext vs Jotai の比較
 *
 * 同じ機能をuseContextとJotaiで実装し、違いを比較します。
 */

// ==================== useContext版 ====================

interface AppState {
  theme: 'light' | 'dark';
  user: { name: string; age: number } | null;
  cartItems: string[];
}

const AppContext = createContext<{
  state: AppState;
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: { name: string; age: number } | null) => void;
  addCartItem: (item: string) => void;
  removeCartItem: (index: number) => void;
} | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    theme: 'light',
    user: null,
    cartItems: [],
  });

  const setTheme = (theme: 'light' | 'dark') => {
    setState((prev) => ({ ...prev, theme }));
  };

  const setUser = (user: { name: string; age: number } | null) => {
    setState((prev) => ({ ...prev, user }));
  };

  const addCartItem = (item: string) => {
    setState((prev) => ({ ...prev, cartItems: [...prev.cartItems, item] }));
  };

  const removeCartItem = (index: number) => {
    setState((prev) => ({
      ...prev,
      cartItems: prev.cartItems.filter((_, i) => i !== index),
    }));
  };

  return (
    <AppContext.Provider value={{ state, setTheme, setUser, addCartItem, removeCartItem }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// useContext版のコンポーネント
const UseContextThemeControl = () => {
  const { state, setTheme } = useAppContext();
  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
      <h4 className="mb-2 text-sm font-semibold text-orange-800">テーマ制御（useContext）</h4>
      <div className="flex gap-2">
        <button
          onClick={() => setTheme('light')}
          className={`rounded px-3 py-1 text-xs transition-colors ${
            state.theme === 'light'
              ? 'bg-orange-500 text-white'
              : 'bg-white text-orange-700 hover:bg-orange-100'
          }`}
        >
          ライト
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`rounded px-3 py-1 text-xs transition-colors ${
            state.theme === 'dark'
              ? 'bg-orange-500 text-white'
              : 'bg-white text-orange-700 hover:bg-orange-100'
          }`}
        >
          ダーク
        </button>
      </div>
      <p className="mt-2 text-xs text-orange-600">
        現在のテーマ: {state.theme}
        <br />
        ⚠️ state全体が変更されると、すべてのコンポーネントが再レンダリングされます
      </p>
    </div>
  );
};

const UseContextUserDisplay = () => {
  const { state } = useAppContext();
  // ⚠️ 問題: userだけが必要なのに、themeやcartItemsが変更されても再レンダリングされる
  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
      <h4 className="mb-2 text-sm font-semibold text-orange-800">ユーザー表示（useContext）</h4>
      <p className="text-xs text-orange-600">
        {state.user ? `${state.user.name} (${state.user.age}歳)` : '未ログイン'}
      </p>
      <p className="mt-1 text-xs text-orange-500">
        ⚠️ テーマやカートが変更されても再レンダリングされます
      </p>
    </div>
  );
};

const UseContextCartDisplay = () => {
  const { state } = useAppContext();
  // ⚠️ 問題: cartItemsだけが必要なのに、themeやuserが変更されても再レンダリングされる
  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
      <h4 className="mb-2 text-sm font-semibold text-orange-800">カート表示（useContext）</h4>
      <p className="text-xs text-orange-600">商品数: {state.cartItems.length}個</p>
      <p className="mt-1 text-xs text-orange-500">
        ⚠️ テーマやユーザーが変更されても再レンダリングされます
      </p>
    </div>
  );
};

// ==================== Jotai版 ====================

// Jotaiでは、各状態を個別のatomとして定義
export const jotaiThemeAtom = atom<'light' | 'dark'>('light');
export const jotaiUserAtom = atom<{ name: string; age: number } | null>(null);
export const jotaiCartItemsAtom = atom<string[]>([]);

// Jotai版のコンポーネント
const JotaiThemeControl = () => {
  const [theme, setTheme] = useAtom(jotaiThemeAtom);
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h4 className="mb-2 text-sm font-semibold text-blue-800">テーマ制御（Jotai）</h4>
      <div className="flex gap-2">
        <button
          onClick={() => setTheme('light')}
          className={`rounded px-3 py-1 text-xs transition-colors ${
            theme === 'light'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-700 hover:bg-blue-100'
          }`}
        >
          ライト
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`rounded px-3 py-1 text-xs transition-colors ${
            theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700 hover:bg-blue-100'
          }`}
        >
          ダーク
        </button>
      </div>
      <p className="mt-2 text-xs text-blue-600">
        現在のテーマ: {theme}
        <br />✅ themeAtomだけを購読しているため、他のatomが変更されても再レンダリングされません
      </p>
    </div>
  );
};

const JotaiUserDisplay = () => {
  const user = useAtomValue(jotaiUserAtom);
  // ✅ 最適化: userAtomだけを購読しているため、themeやcartItemsが変更されても再レンダリングされない
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h4 className="mb-2 text-sm font-semibold text-blue-800">ユーザー表示（Jotai）</h4>
      <p className="text-xs text-blue-600">
        {user ? `${user.name} (${user.age}歳)` : '未ログイン'}
      </p>
      <p className="mt-1 text-xs text-blue-500">
        ✅ テーマやカートが変更されても再レンダリングされません
      </p>
    </div>
  );
};

const JotaiCartDisplay = () => {
  const cartItems = useAtomValue(jotaiCartItemsAtom);
  // ✅ 最適化: cartItemsAtomだけを購読しているため、themeやuserが変更されても再レンダリングされない
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h4 className="mb-2 text-sm font-semibold text-blue-800">カート表示（Jotai）</h4>
      <p className="text-xs text-blue-600">商品数: {cartItems.length}個</p>
      <p className="mt-1 text-xs text-blue-500">
        ✅ テーマやユーザーが変更されても再レンダリングされません
      </p>
    </div>
  );
};

// ==================== 比較コンポーネント ====================

export const UseContextVsJotaiExample = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">useContext vs Jotai の比較</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="mb-2 font-semibold text-gray-800">主な違い</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h4 className="mb-2 font-semibold text-orange-800">useContext</h4>
                <ul className="space-y-1 text-xs text-orange-700">
                  <li>✅ React標準の機能</li>
                  <li>✅ Providerが必要</li>
                  <li>⚠️ 複数の値をまとめて管理</li>
                  <li>⚠️ 再レンダリングの最適化が難しい</li>
                  <li>⚠️ Provider地獄になりやすい</li>
                  <li>⚠️ Contextが変更されると、すべての消費者が再レンダリング</li>
                </ul>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-800">Jotai</h4>
                <ul className="space-y-1 text-xs text-blue-700">
                  <li>✅ 軽量なライブラリ</li>
                  <li>✅ Providerはオプション</li>
                  <li>✅ 各状態を個別のatomとして管理</li>
                  <li>✅ 必要なatomだけを購読（自動最適化）</li>
                  <li>✅ 柔軟性が高い</li>
                  <li>✅ 必要なatomだけが変更されると再レンダリング</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="mb-2 font-semibold text-yellow-800">💡 パフォーマンスの違い</p>
            <p className="text-xs text-yellow-700">
              useContextでは、Contextの値が変更されると、そのContextを使用しているすべてのコンポーネントが再レンダリングされます。
              <br />
              Jotaiでは、各atomを個別に購読するため、必要なatomだけが変更された場合にのみ再レンダリングされます。
              これにより、パフォーマンスが大幅に向上します。
            </p>
          </div>
        </div>
      </div>

      {/* useContext版 */}
      <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-orange-800">useContext版</h3>
        <p className="mb-4 text-sm text-orange-600">
          Providerでラップする必要があります。すべての状態が1つのContextにまとめられているため、
          1つの状態が変更されると、すべてのコンポーネントが再レンダリングされる可能性があります。
        </p>
        <AppProvider>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <UseContextThemeControl />
            <UseContextUserDisplay />
            <UseContextCartDisplay />
          </div>
          <div className="mt-4 rounded-lg border border-orange-300 bg-orange-100 p-3 text-xs text-orange-700">
            <strong>問題点:</strong>{' '}
            テーマを変更すると、ユーザー表示とカート表示も再レンダリングされます。
            これらはテーマの値を使用していないのに、不要な再レンダリングが発生しています。
          </div>
        </AppProvider>
      </div>

      {/* Jotai版 */}
      <div className="rounded-lg border border-blue-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-blue-800">Jotai版</h3>
        <p className="mb-4 text-sm text-blue-600">
          Providerは不要です（必要に応じて使用可能）。各atomを個別に購読するため、
          必要なatomだけが変更された場合にのみ再レンダリングされます。
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <JotaiThemeControl />
          <JotaiUserDisplay />
          <JotaiCartDisplay />
        </div>
        <div className="mt-4 rounded-lg border border-blue-300 bg-blue-100 p-3 text-xs text-blue-700">
          <strong>利点:</strong>{' '}
          テーマを変更しても、ユーザー表示とカート表示は再レンダリングされません。
          各コンポーネントは必要なatomだけを購読しているため、不要な再レンダリングが発生しません。
        </div>
      </div>

      {/* コード比較 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">コードの比較</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">useContext版のコード</h4>
            <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-xs">
              <code>{`// Contextの定義
const AppContext = createContext<AppState | null>(null);

// Providerでラップ
<AppProvider>
  <Component />
</AppProvider>

// 使用時（すべての状態を取得）
const { state } = useAppContext();
// ⚠️ state全体が変更されると再レンダリング`}</code>
            </pre>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">Jotai版のコード</h4>
            <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-xs">
              <code>{`// Atomの定義（個別に定義）
const themeAtom = atom('light');
const userAtom = atom(null);
const cartItemsAtom = atom([]);

// Providerは不要（オプション）
<Component />

// 使用時（必要なatomだけを購読）
const theme = useAtomValue(themeAtom);
// ✅ themeAtomだけが変更された場合にのみ再レンダリング`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* 使い分けのガイド */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">使い分けのガイド</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">useContextが適切なケース</h4>
            <ul className="list-disc space-y-1 pl-6">
              <li>少数の状態をまとめて管理する場合</li>
              <li>状態が頻繁に一緒に変更される場合</li>
              <li>React標準の機能のみを使いたい場合</li>
              <li>シンプルなアプリケーション</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">Jotaiが適切なケース</h4>
            <ul className="list-disc space-y-1 pl-6">
              <li>多くの状態を個別に管理したい場合</li>
              <li>パフォーマンスの最適化が重要な場合</li>
              <li>必要な状態だけを購読したい場合</li>
              <li>複数のContextを避けたい場合（Provider地獄の回避）</li>
              <li>Derived state（計算された状態）が必要な場合</li>
              <li>非同期状態の管理が必要な場合</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
