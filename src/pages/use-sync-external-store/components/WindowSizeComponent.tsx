import { useSyncExternalStore } from 'react';
import { windowSizeStore } from '../stores';

export const WindowSizeComponent = () => {
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
