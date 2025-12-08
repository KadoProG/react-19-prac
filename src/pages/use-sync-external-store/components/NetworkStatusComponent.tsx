import { useSyncExternalStore } from 'react';
import { networkStatusStore } from '../stores';

export const NetworkStatusComponent = () => {
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
