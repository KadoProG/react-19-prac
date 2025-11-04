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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">ユーザー登録</h1>
          <form
            action={submitAction}
            className={`space-y-6 ${isPending ? 'pointer-events-none opacity-75' : ''}`}
            aria-disabled={isPending}
          >
            <div>
              <label
                htmlFor="name"
                className={`mb-2 block text-sm font-medium transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`mb-2 block text-sm font-medium transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={isPending}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className={`mb-2 block text-sm font-medium transition-colors ${isPending ? 'text-gray-400' : 'text-gray-700'}`}
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={isPending}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
              disabled={isPending}
            >
              {isPending && (
                <svg
                  className="h-5 w-5 animate-spin text-white"
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
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
