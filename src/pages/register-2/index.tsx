import { useState, useActionState } from 'react';

export const Register2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, submitAction, isPending] = useActionState(
    async (previousState: string | null, formData: FormData) => {
      console.log(previousState);
      if (name === '') return '名前を入力してください';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(formData.get('name'));
      console.log(formData.get('email'));
      console.log(formData.get('password'));
      return null;
    },
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">ユーザー登録</h1>
          <form
            action={submitAction}
            className={`space-y-6 ${isPending ? 'opacity-75 pointer-events-none' : ''}`}
            aria-disabled={isPending}
          >
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
              >
                名前
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="名前を入力してください"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="パスワードを入力してください"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isPending}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:transform-none disabled:hover:scale-100 flex items-center justify-center gap-2"
              disabled={isPending}
            >
              {isPending && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isPending ? '登録中...' : '登録'}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};
