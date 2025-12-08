import { useCounter, useWindowSize, useNetworkStatus } from '../hooks';

/**
 * カスタムフックを使用したコンポーネント
 *
 * カスタムフック（hooks.ts）を使用することで、
 * ストアの実装詳細を隠蔽し、より使いやすくなります。
 */
export const CustomHookExample = () => {
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
