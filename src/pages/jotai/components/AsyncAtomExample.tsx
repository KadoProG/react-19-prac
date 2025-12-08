import { useAtomValue } from 'jotai';
import { asyncDataAtom } from '../atoms';
import { Suspense } from 'react';

/**
 * 非同期Atomの例
 *
 * Jotaiは非同期atomをサポートしています。
 * 非同期atomはPromiseを返すことができ、Suspenseと組み合わせて使用できます。
 */
export const AsyncAtomExample = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">4. 非同期Atom</h2>
      <p className="mb-4 text-sm text-gray-600">
        Jotaiは非同期atomをサポートしています。非同期atomはPromiseを返すことができ、
        <code className="mx-1 rounded bg-gray-100 px-2 py-1 text-xs">Suspense</code>
        と組み合わせて使用できます。
      </p>

      <Suspense fallback={<AsyncDataLoading />}>
        <AsyncDataContent />
      </Suspense>
    </div>
  );
};

const AsyncDataContent = () => {
  const data = useAtomValue(asyncDataAtom);

  return (
    <div className="rounded-lg bg-green-50 p-4">
      <div className="text-sm text-green-600">取得したデータ:</div>
      <div className="mt-2 font-semibold text-green-900">{data.message}</div>
      <div className="mt-1 text-xs text-green-700">
        タイムスタンプ: {new Date(data.timestamp).toLocaleString('ja-JP')}
      </div>
      <p className="mt-3 text-xs text-green-600">
        ※ このページをリロードすると、1秒の遅延後にデータが表示されます。
      </p>
    </div>
  );
};

const AsyncDataLoading = () => {
  return (
    <div className="rounded-lg bg-yellow-50 p-4">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent"></div>
        <span className="text-sm text-yellow-700">データを読み込んでいます...</span>
      </div>
    </div>
  );
};
