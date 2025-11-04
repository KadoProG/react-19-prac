import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Aboutページ</h1>
          <p className="mb-8 text-lg text-gray-600">これはAboutページです。</p>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <Link
              to="/"
              className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
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
