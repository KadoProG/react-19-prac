import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">ホームページ</h1>
          <p className="mb-8 text-lg text-gray-600">ようこそ、ホームページへ！</p>

          <nav className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">ページ一覧</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Link
                to="/about"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">Aboutページ</span>
                <span className="mt-1 block text-sm text-gray-500">プロジェクトについて</span>
              </Link>
              <Link
                to="/register"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">Registerページ</span>
                <span className="mt-1 block text-sm text-gray-500">useTransition使用</span>
              </Link>
              <Link
                to="/register2"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">Register2ページ</span>
                <span className="mt-1 block text-sm text-gray-500">useActionState使用</span>
              </Link>
              <Link
                to="/register3"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">Register3ページ</span>
                <span className="mt-1 block text-sm text-gray-500">useOptimistic使用</span>
              </Link>
              <Link
                to="/use-example"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">UseExampleページ</span>
                <span className="mt-1 block text-sm text-gray-500">use使用</span>
              </Link>
              <Link
                to="/separating-events-from-effects"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">SeparatingEventsFromEffectsページ</span>
                <span className="mt-1 block text-sm text-gray-500">useEffect使用</span>
              </Link>
              <Link
                to="/use-layout-effect"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">UseLayoutEffectページ</span>
                <span className="mt-1 block text-sm text-gray-500">useLayoutEffect使用</span>
              </Link>
              <Link
                to="/use-sync-external-store"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">UseSyncExternalStoreページ</span>
                <span className="mt-1 block text-sm text-gray-500">useSyncExternalStore使用</span>
              </Link>
              <Link
                to="/use-sync-external-store-window-resize"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">UseSyncExternalStoreWindowResizeページ</span>
                <span className="mt-1 block text-sm text-gray-500">useSyncExternalStore使用</span>
              </Link>
              <Link
                to="/jotai"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">Jotaiページ</span>
                <span className="mt-1 block text-sm text-gray-500">Jotai状態管理ライブラリ</span>
              </Link>
              <Link
                to="/ime-enter-comparison"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">IME Enter比較ページ</span>
                <span className="mt-1 block text-sm text-gray-500">IME変換中のEnterキー処理の比較</span>
              </Link>
              <Link
                to="/counter-verification"
                className="block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="font-medium">Counter検証ページ</span>
                <span className="mt-1 block text-sm text-gray-500">複数のcounter実装の比較・検証</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
