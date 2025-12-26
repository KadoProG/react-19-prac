import { useCallback, useEffect, useRef, useState } from 'react';

// keyCode は非推奨だが、IME検出のために使用する
// KeyboardEvent に keyCode が存在するかチェックするヘルパー関数
const getKeyCode = (e: KeyboardEvent): number | undefined => {
  return 'keyCode' in e ? (e as KeyboardEvent & { keyCode: number }).keyCode : undefined;
};

export const ImeEnterComparison = () => {
  const [method1Logs, setMethod1Logs] = useState<string[]>([]);
  const [method2Logs, setMethod2Logs] = useState<string[]>([]);
  const [method3Logs, setMethod3Logs] = useState<string[]>([]);
  const [method1Value, setMethod1Value] = useState('');
  const [method2Value, setMethod2Value] = useState('');
  const [method3Value, setMethod3Value] = useState('');
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);

  const onSubmit1 = useCallback(() => {
    setMethod1Logs((prev) => [...prev, `📤 方法1: 送信処理が実行されました`]);
  }, []);

  const onSubmit2 = useCallback(() => {
    setMethod2Logs((prev) => [...prev, `📤 方法2: 送信処理が実行されました`]);
  }, []);

  const onSubmit3 = useCallback(() => {
    setMethod3Logs((prev) => [...prev, `📤 方法3: 送信処理が実行されました`]);
  }, []);

  // 方法1: isComposing と keyCode 229 を使用
  // 注意: ユーザーが提示したコードの条件は論理的に逆の可能性があります
  // 提示されたコード: (e.key === 'Enter' && e.isComposing) || e.keyCode === 229
  // これは「IME変換中またはkeyCode 229の時に処理」という意味になりますが、
  // 通常は「IME変換中でない時のみ処理」すべきです
  // ここでは提示されたコードに近い形で実装します
  useEffect(() => {
    const handleKeyDown1 = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const keyCode = getKeyCode(e);
        // ユーザーが提示したコードの条件（論理的に逆の可能性あり）
        if ((e.key === 'Enter' && e.isComposing) || keyCode === 229) {
          e.stopPropagation();
          e.preventDefault();
          setMethod1Logs((prev) => [
            ...prev,
            `⚠️ IME変換中のEnterが検出されました (isComposing: ${e.isComposing}, keyCode: ${keyCode ?? 'N/A'})`,
          ]);
          onSubmit1();
        } else {
          setMethod1Logs((prev) => [
            ...prev,
            `✅ 通常のEnterが検出されました (isComposing: ${e.isComposing}, keyCode: ${keyCode ?? 'N/A'})`,
          ]);
          onSubmit1();
        }
      }
    };

    const input = input1Ref.current;
    if (input) {
      input.addEventListener('keydown', handleKeyDown1, { capture: true });
      return () => {
        input.removeEventListener('keydown', handleKeyDown1, { capture: true });
      };
    }
  }, [onSubmit1]);

  // 方法2: keyCode 13 のみを使用
  useEffect(() => {
    const handleKeyDown2 = (e: KeyboardEvent) => {
      const keyCode = getKeyCode(e);
      if (keyCode === 13) {
        e.preventDefault();
        setMethod2Logs((prev) => [
          ...prev,
          `Enterが検出されました (isComposing: ${e.isComposing}, keyCode: ${keyCode ?? 'N/A'})`,
        ]);
        onSubmit2();
      }
    };

    const input = input2Ref.current;
    if (input) {
      input.addEventListener('keydown', handleKeyDown2);
      return () => {
        input.removeEventListener('keydown', handleKeyDown2);
      };
    }
  }, [onSubmit2]);

  // 方法3: !e.isComposing のみを使用（keyCode 229チェックなし）
  useEffect(() => {
    const handleKeyDown3 = (e: KeyboardEvent) => {
      const keyCode = getKeyCode(e);
      console.log(keyCode, e.isComposing, e.key);
      if (e.key === 'Enter' && !e.isComposing) {
        e.preventDefault();
        setMethod3Logs((prev) => [
          ...prev,
          `✅ Enterが検出されました (isComposing: ${e.isComposing}, keyCode: ${keyCode ?? 'N/A'})`,
        ]);
        onSubmit3();
      } else if (e.key === 'Enter' && e.isComposing) {
        setMethod3Logs((prev) => [
          ...prev,
          `⏸️ IME変換中のEnterを無視しました (isComposing: ${e.isComposing}, keyCode: ${keyCode ?? 'N/A'})`,
        ]);
      }
    };

    const input = input3Ref.current;
    if (input) {
      input.addEventListener('keydown', handleKeyDown3, { capture: true });
      return () => {
        input.removeEventListener('keydown', handleKeyDown3, { capture: true });
      };
    }
  }, [onSubmit3]);

  const clearLogs1 = () => {
    setMethod1Logs([]);
    setMethod1Value('');
  };

  const clearLogs2 = () => {
    setMethod2Logs([]);
    setMethod2Value('');
  };

  const clearLogs3 = () => {
    setMethod3Logs([]);
    setMethod3Value('');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          IME変換中のEnterキー処理の比較
        </h1>

        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-blue-900">説明</h2>
          <div className="space-y-3 text-sm text-blue-800">
            <p>
              <strong>問題:</strong>{' '}
              HTMLフォームでEnterキーが押されたとき、IME変換中でもEnter判定になってしまう問題があります。
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>方法1:</strong>{' '}
                <code className="rounded bg-blue-100 px-2 py-1">
                  (e.key === 'Enter' && e.isComposing) || e.keyCode === 229
                </code>
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>
                  <code>e.isComposing</code>: IME変換中かどうかを判定するプロパティ（true = 変換中）
                </li>
                <li>
                  <code>keyCode === 229</code>:
                  IME入力中のキーコード（日本語入力中にEnterを押すと発生）
                </li>
                <li>
                  <code>capture: true</code>:
                  キャプチャフェーズでイベントを捕捉（より早期に処理可能）
                </li>
                <li>
                  <code>stopPropagation()</code>: イベントの伝播を停止
                </li>
                <li>
                  <strong>⚠️ 注意:</strong> 提示されたコードの条件{' '}
                  <code className="rounded bg-blue-100 px-2 py-1">
                    (e.key === 'Enter' && e.isComposing) || e.keyCode === 229
                  </code>{' '}
                  は「IME変換中またはkeyCode
                  229の時に処理」という意味になりますが、これは通常は逆です。
                </li>
                <li>
                  <strong>正しい条件:</strong> 通常は{' '}
                  <code className="rounded bg-blue-100 px-2 py-1">
                    e.key === 'Enter' && !e.isComposing && e.keyCode !== 229
                  </code>{' '}
                  で「IME変換中でない時のみ処理」すべきです。
                </li>
              </ul>
            </div>
            <div className="mt-4 space-y-2">
              <p>
                <strong>方法2:</strong>{' '}
                <code className="rounded bg-blue-100 px-2 py-1">e.keyCode === 13</code>
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>EnterキーのkeyCode（13）のみをチェック</li>
                <li>
                  <code>preventDefault()</code>: デフォルトの動作を防止
                </li>
                <li>
                  <strong>❌ 問題点:</strong>{' '}
                  IME変換中の判定がないため、変換確定のEnterでも送信されてしまう可能性があります
                </li>
                <li>シンプルだが、IME対応が不完全</li>
                <li>
                  <code>capture</code>
                  オプションを使用していないため、イベントの捕捉タイミングが異なる
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 方法1 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                方法1: isComposing + keyCode 229
              </h2>
              <button
                onClick={clearLogs1}
                className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
              >
                ログをクリア
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                テキスト入力（日本語入力でIME変換中にEnterを押してみてください）
              </label>
              <input
                ref={input1Ref}
                type="text"
                value={method1Value}
                onChange={(e) => setMethod1Value(e.target.value)}
                placeholder="日本語を入力してEnter..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>
            <div className="rounded bg-gray-50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-700">ログ:</h3>
              <div className="max-h-64 space-y-1 overflow-y-auto text-xs">
                {method1Logs.length === 0 ? (
                  <p className="text-gray-400">ログがありません</p>
                ) : (
                  method1Logs.map((log, index) => (
                    <div key={index} className="rounded bg-white p-2 font-mono">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 方法2 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">方法2: keyCode 13 のみ</h2>
              <button
                onClick={clearLogs2}
                className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
              >
                ログをクリア
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                テキスト入力（日本語入力でIME変換中にEnterを押してみてください）
              </label>
              <input
                ref={input2Ref}
                type="text"
                value={method2Value}
                onChange={(e) => setMethod2Value(e.target.value)}
                placeholder="日本語を入力してEnter..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>
            <div className="rounded bg-gray-50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-700">ログ:</h3>
              <div className="max-h-64 space-y-1 overflow-y-auto text-xs">
                {method2Logs.length === 0 ? (
                  <p className="text-gray-400">ログがありません</p>
                ) : (
                  method2Logs.map((log, index) => (
                    <div key={index} className="rounded bg-white p-2 font-mono">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 方法3: !e.isComposing のみ */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">方法3: !e.isComposing のみ</h2>
              <button
                onClick={clearLogs3}
                className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
              >
                ログをクリア
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                テキスト入力（日本語入力でIME変換中にEnterを押してみてください）
              </label>
              <input
                ref={input3Ref}
                type="text"
                value={method3Value}
                onChange={(e) => setMethod3Value(e.target.value)}
                placeholder="日本語を入力してEnter..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>
            <div className="rounded bg-gray-50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-700">ログ:</h3>
              <div className="max-h-64 space-y-1 overflow-y-auto text-xs">
                {method3Logs.length === 0 ? (
                  <p className="text-gray-400">ログがありません</p>
                ) : (
                  method3Logs.map((log, index) => (
                    <div key={index} className="rounded bg-white p-2 font-mono">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-purple-200 bg-purple-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-purple-900">
            <code>keyCode !== 229</code> は必要か？
          </h2>
          <div className="space-y-3 text-sm text-purple-800">
            <p>
              <strong>結論:</strong> 多くの場合、<code>!e.isComposing</code>{' '}
              だけで十分に動作しますが、
              <code>e.keyCode !== 229</code>{' '}
              のチェックを追加することで、より確実にIME入力を検出できます。
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>
                  方法3（<code>!e.isComposing</code> のみ）:
                </strong>
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>
                  <strong>✅ メリット:</strong> シンプルで読みやすい、多くのブラウザで正しく動作する
                </li>
                <li>
                  <strong>⚠️ 注意点:</strong> 一部のブラウザやIME実装では、<code>isComposing</code>{' '}
                  が完全に信頼できない場合がある
                </li>
              </ul>
            </div>
            <div className="mt-4 space-y-2">
              <p>
                <strong>
                  推奨実装（<code>!e.isComposing && e.keyCode !== 229</code>）:
                </strong>
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>
                  <strong>✅ メリット:</strong>{' '}
                  より確実にIME入力を検出できる、ブラウザ間の互換性が高い
                </li>
                <li>
                  <strong>⚠️ 注意点:</strong> <code>keyCode</code>{' '}
                  は非推奨プロパティだが、IME検出には有効
                </li>
                <li>
                  <strong>💡 推奨:</strong> 本番環境では、両方のチェックを使用することを推奨
                </li>
              </ul>
            </div>
            <div className="mt-4 rounded bg-purple-100 p-4">
              <p className="mb-2 font-semibold">実装の推奨:</p>
              <pre className="overflow-x-auto rounded bg-white p-3 text-xs">
                <code>{`// 推奨: 両方のチェックを使用（より確実）
if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) {
  e.preventDefault();
  onSubmit();
}

// 最小限: isComposing のみ（多くの場合動作する）
if (e.key === 'Enter' && !e.isComposing) {
  e.preventDefault();
  onSubmit();
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-yellow-900">テスト方法</h2>
          <ol className="list-inside list-decimal space-y-2 text-sm text-yellow-800">
            <li>各入力フィールドで日本語入力モード（IME）を有効にします</li>
            <li>「こんにちは」など日本語を入力します</li>
            <li>変換候補が表示されている状態（IME変換中）でEnterキーを押します</li>
            <li>ログを確認して、どちらの方法がIME変換中のEnterを適切に処理しているか確認します</li>
            <li>変換確定後、再度Enterキーを押して通常のEnterの動作も確認します</li>
          </ol>
        </div>

        <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-green-900">推奨される実装</h2>
          <div className="space-y-4 text-sm text-green-800">
            <div>
              <p className="mb-2 font-semibold">推奨実装（両方のチェック）:</p>
              <pre className="overflow-x-auto rounded bg-green-100 p-4 text-xs">
                <code>{`document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) {
    e.preventDefault();
    onSubmit();
  }
}, { capture: true });`}</code>
              </pre>
            </div>
            <div className="mt-4">
              <p className="mb-2 font-semibold">最小限の実装（isComposing のみ）:</p>
              <pre className="overflow-x-auto rounded bg-green-100 p-4 text-xs">
                <code>{`document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.isComposing) {
    e.preventDefault();
    onSubmit();
  }
}, { capture: true });`}</code>
              </pre>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">主な違いのまとめ:</h3>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-green-300">
                    <th className="p-2 text-left">項目</th>
                    <th className="p-2 text-left">方法1</th>
                    <th className="p-2 text-left">方法2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-green-200">
                    <td className="p-2 font-semibold">IME判定</td>
                    <td className="p-2">
                      <code>isComposing</code>と<code>keyCode 229</code>を使用
                    </td>
                    <td className="p-2">なし（IME判定なし）</td>
                  </tr>
                  <tr className="border-b border-green-200">
                    <td className="p-2 font-semibold">イベント捕捉</td>
                    <td className="p-2">
                      <code>capture: true</code>でキャプチャフェーズ
                    </td>
                    <td className="p-2">バブリングフェーズ（デフォルト）</td>
                  </tr>
                  <tr className="border-b border-green-200">
                    <td className="p-2 font-semibold">イベント制御</td>
                    <td className="p-2">
                      <code>stopPropagation()</code>と<code>preventDefault()</code>
                    </td>
                    <td className="p-2">
                      <code>preventDefault()</code>のみ
                    </td>
                  </tr>
                  <tr className="border-b border-green-200">
                    <td className="p-2 font-semibold">問題点</td>
                    <td className="p-2">条件が論理的に逆の可能性</td>
                    <td className="p-2">IME変換中のEnterも処理されてしまう</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>
                <code>!e.isComposing</code>: IME変換中でないことを確認（重要）
              </li>
              <li>
                <code>e.keyCode !== 229</code>: IME入力中のkeyCodeでないことを確認（追加の安全性）
              </li>
              <li>
                <code>capture: true</code>:
                イベントのキャプチャフェーズで処理することで、より確実に制御可能
              </li>
              <li>
                <code>preventDefault()</code>: フォームのデフォルト送信を防止
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
