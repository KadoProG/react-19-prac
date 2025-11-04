import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ホームページ</h1>
          <p className="text-gray-600 text-lg mb-8">ようこそ、ホームページへ！</p>

          <nav className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">ページ一覧</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                to="/about"
                className="block px-6 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
              >
                <span className="font-medium">Aboutページ</span>
                <span className="text-sm text-gray-500 block mt-1">プロジェクトについて</span>
              </Link>
              <Link
                to="/register"
                className="block px-6 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
              >
                <span className="font-medium">Registerページ</span>
                <span className="text-sm text-gray-500 block mt-1">useTransition使用</span>
              </Link>
              <Link
                to="/register2"
                className="block px-6 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
              >
                <span className="font-medium">Register2ページ</span>
                <span className="text-sm text-gray-500 block mt-1">useActionState使用</span>
              </Link>
              <Link
                to="/register3"
                className="block px-6 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
              >
                <span className="font-medium">Register3ページ</span>
                <span className="text-sm text-gray-500 block mt-1">useOptimistic使用</span>
              </Link>
              <Link
                to="/use-example"
                className="block px-6 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
              >
                <span className="font-medium">UseExampleページ</span>
                <span className="text-sm text-gray-500 block mt-1">use使用</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
