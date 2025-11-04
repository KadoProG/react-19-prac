import { useState, useActionState, useOptimistic } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

// アクションタイプの定義
// アクションオブジェクトパターンは複数の操作を扱う場合に推奨される
type OptimisticAction =
  | { type: 'add'; data: Partial<User>; id?: number } // idはオプショナル（reducer内で生成も可能）
  | { type: 'update'; id: number; data?: Partial<User> }
  | { type: 'delete'; id: number };

// サーバー側のユーザーリスト（実際のアプリではAPIから取得）
const initialUsers: User[] = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
  { id: 2, name: '佐藤花子', email: 'sato@example.com' },
];

let nextId = 3;

export const Register3 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>(initialUsers);

  // 楽観的更新: アクションオブジェクトパターンで複数の操作を処理
  // このパターンは複数の操作タイプ（add, update, delete）を扱う場合に推奨される
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state: User[], action: OptimisticAction): User[] => {
      switch (action.type) {
        case 'add': {
          // 新しいユーザーを追加
          // IDが指定されていない場合はreducer内で生成
          const newUser: User = {
            id: action.id ?? nextId++,
            name: action.data.name || '',
            email: action.data.email || '',
          };
          return [...state, newUser];
        }
        case 'update': {
          // ユーザーを更新（dataが指定されていない場合は削除扱い）
          if (!action.data) {
            return state.filter((user) => user.id !== action.id);
          }
          return state.map((user) => (user.id === action.id ? { ...user, ...action.data } : user));
        }
        case 'delete': {
          // ユーザーを削除
          return state.filter((user) => user.id !== action.id);
        }
        default:
          return state;
      }
    }
  );

  const [error, submitAction, isPending] = useActionState(
    async (_previousState: string | null, formData: FormData) => {
      const formName = formData.get('name') as string;
      const formEmail = formData.get('email') as string;

      if (formName === '') return '名前を入力してください';
      if (formEmail === '') return 'メールアドレスを入力してください';

      // 楽観的更新を実行: アクションオブジェクト形式で送信
      // IDを事前に生成してアクションに含める（サーバー側の状態更新でも同じIDを使用）
      const newUserId = nextId++;
      addOptimisticUser({
        type: 'add',
        id: newUserId,
        data: {
          name: formName,
          email: formEmail,
        },
      });

      // サーバーリクエストをシミュレート（2秒かかる）
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // エラーが発生する可能性をシミュレート（10%の確率）
      if (Math.random() < 0.1) {
        // エラー時、useOptimisticが自動的に元の状態に復元します
        throw new Error('サーバーエラーが発生しました');
      }

      // 成功時: サーバーの状態を更新（楽観的更新で使用したIDと同じ）
      const newUser: User = {
        id: newUserId,
        name: formName,
        email: formEmail,
      };
      setUsers((prev) => [...prev, newUser]);
      console.log('登録完了:', formName, formEmail);

      // フォームをリセット
      setName('');
      setEmail('');
      setPassword('');

      return null;
    },
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            ユーザー登録（楽観的更新）
          </h1>

          {/* 登録済みユーザーリスト */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">登録済みユーザー</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {optimisticUsers.length === 0 ? (
                <p className="text-gray-500 text-sm">まだユーザーが登録されていません</p>
              ) : (
                optimisticUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      ID: {user.id}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 登録フォーム */}
          <form
            action={submitAction}
            className={`space-y-6 ${isPending ? 'opacity-75 pointer-events-none' : ''}`}
            aria-disabled={isPending}
          >
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
              >
                名前
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="名前を入力してください"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="パスワードを入力してください"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isPending}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:transform-none disabled:hover:scale-100 flex items-center justify-center gap-2"
              disabled={isPending}
            >
              {isPending && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isPending ? '登録中...' : '登録'}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">エラー: {error}</p>
              <p className="text-red-500 text-xs mt-1">楽観的更新が自動的に元に戻されました</p>
            </div>
          )}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm mb-2">
              <strong>楽観的更新の動作:</strong>{' '}
              フォーム送信後、サーバー応答を待たずにユーザーリストに即座に追加されます。
              エラーが発生した場合、自動的に元の状態に戻ります。
            </p>
            <p className="text-blue-800 text-sm">
              <strong>アクションオブジェクトパターン:</strong>{' '}
              <code className="bg-blue-100 px-1 rounded">{'{ type: "add", data: {...} }'}</code>{' '}
              のような形式で、複数の操作（add, update, delete）を一つのreducerで処理できます。
              これは複数の操作タイプを扱う場合に推奨されるパターンです。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
