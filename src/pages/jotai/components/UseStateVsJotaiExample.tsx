import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom } from '../atoms';
import { atom } from 'jotai';

/**
 * useState vs Jotai の使い分け
 *
 * どのような状態をJotaiで管理すべきか、useStateと比較しながら説明します。
 */

// Jotaiで管理すべき状態の例
export const themeAtom = atom<'light' | 'dark'>('light');
export const cartItemsAtom = atom<string[]>([]);

/**
 * useStateが適切なケース
 * - 単一コンポーネント内でのみ使用される状態
 * - 他のコンポーネントと共有する必要がない状態
 * - フォーム入力、モーダルの開閉（そのコンポーネント内のみ）など
 */
const UseStateExample = () => {
  // ✅ useStateが適切：このコンポーネント内でのみ使用されるフォーム入力
  const [localInput, setLocalInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-green-800">✅ useStateが適切なケース</h3>
      <p className="mb-4 text-sm text-green-700">
        単一コンポーネント内でのみ使用される状態は、useStateで管理するのが適切です。
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-green-800">
            ローカル入力（useState）
          </label>
          <input
            type="text"
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="このコンポーネント内でのみ使用"
            className="w-full rounded-lg border border-green-300 bg-white px-4 py-2 text-green-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
          />
          <p className="mt-1 text-xs text-green-600">
            値: {localInput || '(空)'} - 他のコンポーネントからはアクセスできません
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            {isModalOpen ? 'モーダルを閉じる' : 'モーダルを開く'}
          </button>
          {isModalOpen && (
            <div className="mt-2 rounded-lg border border-green-300 bg-white p-4 text-sm text-green-800">
              これはローカルなモーダルです。このコンポーネント内でのみ制御されます。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Jotaiが適切なケース
 * - 複数のコンポーネント間で共有される状態
 * - アプリケーション全体で使用されるグローバル状態
 * - ユーザー情報、テーマ設定、カートの状態など
 */
const JotaiExample = () => {
  const [user, setUser] = useAtom(userAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-blue-800">✅ Jotaiが適切なケース</h3>
      <p className="mb-4 text-sm text-blue-700">
        複数のコンポーネント間で共有される状態は、Jotaiで管理するのが適切です。
      </p>

      <div className="space-y-4">
        {/* ユーザー情報 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-blue-800">
            ユーザー情報（Jotai）
          </label>
          {user ? (
            <div className="rounded-lg border border-blue-300 bg-white p-3">
              <p className="text-sm text-blue-900">
                {user.name} ({user.age}歳)
              </p>
              <button
                onClick={() => setUser(null)}
                className="mt-2 rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="名前"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const nameInput = e.currentTarget;
                    const ageInput = nameInput.nextElementSibling as HTMLInputElement;
                    if (nameInput.value && ageInput.value) {
                      setUser({
                        name: nameInput.value,
                        age: parseInt(ageInput.value, 10),
                      });
                      nameInput.value = '';
                      ageInput.value = '';
                    }
                  }
                }}
                className="flex-1 rounded-lg border border-blue-300 bg-white px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <input
                type="number"
                placeholder="年齢"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const ageInput = e.currentTarget;
                    const nameInput = ageInput.previousElementSibling as HTMLInputElement;
                    if (nameInput.value && ageInput.value) {
                      setUser({
                        name: nameInput.value,
                        age: parseInt(ageInput.value, 10),
                      });
                      nameInput.value = '';
                      ageInput.value = '';
                    }
                  }
                }}
                className="w-24 rounded-lg border border-blue-300 bg-white px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
          )}
          <p className="mt-1 text-xs text-blue-600">
            この状態は他のコンポーネント（UserDisplay）からもアクセスできます
          </p>
        </div>

        {/* テーマ設定 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-blue-800">
            テーマ設定（Jotai）
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                theme === 'light'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-700 hover:bg-blue-100'
              }`}
            >
              ライト
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-700 hover:bg-blue-100'
              }`}
            >
              ダーク
            </button>
          </div>
          <p className="mt-1 text-xs text-blue-600">
            現在のテーマ: {theme} - アプリ全体で共有されます
          </p>
        </div>

        {/* カート */}
        <div>
          <label className="mb-2 block text-sm font-medium text-blue-800">カート（Jotai）</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="商品名を入力"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  setCartItems([...cartItems, e.currentTarget.value.trim()]);
                  e.currentTarget.value = '';
                }
              }}
              className="flex-1 rounded-lg border border-blue-300 bg-white px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>
          {cartItems.length > 0 && (
            <div className="mt-2 space-y-1">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-blue-900"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="mt-1 text-xs text-blue-600">
            カート内: {cartItems.length}個 - 他のコンポーネント（CartSummary）からも参照できます
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 別コンポーネントからJotaiの状態を参照
 * これがJotaiの強み：複数のコンポーネント間で状態を共有できる
 */
const UserDisplay = () => {
  const user = useAtomValue(userAtom);
  const theme = useAtomValue(themeAtom);
  const cartItems = useAtomValue(cartItemsAtom);

  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50 p-6 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-purple-800">
        📡 別コンポーネントからの参照（Jotaiの強み）
      </h3>
      <p className="mb-4 text-sm text-purple-700">
        このコンポーネントは、JotaiExampleと同じatomを参照しています。
        状態が変更されると、自動的に再レンダリングされます。
      </p>

      <div className="space-y-3 text-sm">
        <div>
          <strong className="text-purple-800">ユーザー情報:</strong>{' '}
          <span className="text-purple-600">
            {user ? `${user.name} (${user.age}歳)` : '未ログイン'}
          </span>
        </div>
        <div>
          <strong className="text-purple-800">テーマ:</strong>{' '}
          <span className="text-purple-600">{theme}</span>
        </div>
        <div>
          <strong className="text-purple-800">カート内の商品数:</strong>{' '}
          <span className="text-purple-600">{cartItems.length}個</span>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-purple-300 bg-purple-100 p-3 text-xs text-purple-700">
        💡 このコンポーネントは状態を変更していませんが、JotaiExampleで変更された状態を
        自動的に反映しています。これがuseStateでは不可能な、Jotaiの強みです。
      </div>
    </div>
  );
};

export const UseStateVsJotaiExample = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">useState vs Jotai の使い分け</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="mb-2 font-semibold text-gray-800">useStateが適切なケース</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>単一コンポーネント内でのみ使用される状態</strong>
                <br />
                例: フォーム入力、モーダルの開閉（そのコンポーネント内のみ）、一時的なUI状態
              </li>
              <li>
                <strong>他のコンポーネントと共有する必要がない状態</strong>
                <br />
                例: 入力フィールドの値、アコーディオンの開閉状態
              </li>
              <li>
                <strong>コンポーネントのライフサイクルと共に消える状態</strong>
                <br />
                例: コンポーネントがアンマウントされると不要になる状態
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-800">Jotaiが適切なケース</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>複数のコンポーネント間で共有される状態</strong>
                <br />
                例: ユーザー情報、認証状態、カートの内容、通知の状態
              </li>
              <li>
                <strong>アプリケーション全体で使用されるグローバル状態</strong>
                <br />
                例: テーマ設定、言語設定、アプリの設定
              </li>
              <li>
                <strong>コンポーネントの階層が深い場合の状態共有</strong>
                <br />
                例: props drillingを避けたい場合（Context APIの代替として）
              </li>
              <li>
                <strong>サーバー状態やキャッシュの管理</strong>
                <br />
                例: APIから取得したデータ、非同期処理の結果
              </li>
              <li>
                <strong>Derived state（計算された状態）が必要な場合</strong>
                <br />
                例: フィルターされたリスト、合計金額、統計情報
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="mb-2 font-semibold text-yellow-800">💡 判断基準</p>
            <p className="text-sm text-yellow-700">
              「この状態を複数のコンポーネントから参照・更新する必要があるか？」という質問に
              <strong className="text-yellow-800">「はい」</strong>
              と答える場合は、Jotaiを使用することを検討してください。
            </p>
          </div>
        </div>
      </div>

      <UseStateExample />
      <JotaiExample />
      <UserDisplay />
    </div>
  );
};
