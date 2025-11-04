import { use, useState, createContext, Suspense } from 'react';
import { Link } from 'react-router-dom';

// Context の例用
const ThemeContext = createContext<'light' | 'dark'>('light');

// Promise を使ったデータフェッチングの例
const fetchUserData = (userId: number): Promise<{ id: number; name: string; email: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `ユーザー${userId}`,
        email: `user${userId}@example.com`,
      });
    }, 1500);
  });
};

// Promise をキャッシュするためのヘルパー
const createPromiseCache = () => {
  const cache = new Map<number, Promise<{ id: number; name: string; email: string }>>();
  return (userId: number) => {
    if (!cache.has(userId)) {
      cache.set(userId, fetchUserData(userId));
    }
    return cache.get(userId)!;
  };
};

const getUserPromise = createPromiseCache();

// Promise を use で解決するコンポーネント
const UserProfile = ({ userId }: { userId: number }) => {
  const userPromise = getUserPromise(userId);
  const user = use(userPromise);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-900 mb-2">ユーザー情報</h3>
      <p className="text-sm text-gray-700">
        <span className="font-medium">ID:</span> {user.id}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">名前:</span> {user.name}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">メール:</span> {user.email}
      </p>
    </div>
  );
};

// Context を use で読み取るコンポーネント
const ThemeDisplay = () => {
  const theme = use(ThemeContext);

  return (
    <div
      className={`p-4 rounded-lg border ${theme === 'light' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-800 border-gray-700'}`}
    >
      <p className={`font-medium ${theme === 'light' ? 'text-yellow-900' : 'text-white'}`}>
        現在のテーマ: <span className="uppercase">{theme}</span>
      </p>
    </div>
  );
};

// Suspense のフォールバック
const LoadingFallback = () => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

export const UseExample = () => {
  const [userId, setUserId] = useState(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              ホームに戻る
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              React.use の使用例
            </h1>
            <p className="text-gray-600 text-lg">
              React 19 の新しい <code className="bg-gray-100 px-2 py-1 rounded">use</code>{' '}
              フックの使用例です。
            </p>
          </div>

          <div className="space-y-8">
            {/* Promise の例 */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Promise を解決する例</h2>
              <p className="text-gray-600 mb-4">
                <code className="bg-gray-100 px-2 py-1 rounded">use</code> フックを使って Promise
                を直接解決できます。 Suspense
                と組み合わせることで、非同期処理をより直感的に扱えます。
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ユーザーIDを選択:
                  </label>
                  <select
                    value={userId}
                    onChange={(e) => setUserId(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none"
                  >
                    <option value={1}>ユーザー1</option>
                    <option value={2}>ユーザー2</option>
                    <option value={3}>ユーザー3</option>
                  </select>
                </div>
                <Suspense fallback={<LoadingFallback />}>
                  <UserProfile userId={userId} />
                </Suspense>
              </div>
            </section>

            {/* Context の例 */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Context を読み取る例</h2>
              <p className="text-gray-600 mb-4">
                <code className="bg-gray-100 px-2 py-1 rounded">use</code> フックを使って Context
                を読み取ることもできます。 従来の{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">useContext</code>{' '}
                の代替として使用できます。
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    テーマを選択:
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        theme === 'light'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
                <ThemeContext.Provider value={theme}>
                  <ThemeDisplay />
                </ThemeContext.Provider>
              </div>
            </section>

            {/* コード例 */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">コード例</h2>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100">
                  <code>{`// Promise を解決する例
const UserProfile = ({ userId }) => {
  const userPromise = getUserPromise(userId);
  const user = use(userPromise); // Promise を直接解決
  
  return <div>{user.name}</div>;
};

// Context を読み取る例
const ThemeDisplay = () => {
  const theme = use(ThemeContext); // Context を直接読み取り
  
  return <div>現在のテーマ: {theme}</div>;
};`}</code>
                </pre>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
