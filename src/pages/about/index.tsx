import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Aboutページ</h1>
          <p className="text-gray-600 text-lg mb-8">これはAboutページです。</p>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              ホームページへ戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
