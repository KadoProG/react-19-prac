import { WindowSize } from './components/WindowSize';
import { WindowSize_NoSync } from './components/WindowSize_NoSync';

export const UseSyncExternalStoreWindowResize = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">useSyncExternalStore の使用例</h1>
        </div>

        <div className="space-y-6">
          <WindowSize />
          <WindowSize_NoSync />
        </div>
      </div>
    </div>
  );
};
