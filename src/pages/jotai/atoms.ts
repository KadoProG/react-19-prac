import { atom } from 'jotai';

/**
 * Jotai Atoms の定義
 *
 * Jotaiでは、atomが状態管理の基本単位です。
 * 各atomは独立した状態を持ち、useAtomフックで読み書きできます。
 */

// 基本的なatom（プリミティブ型）
export const countAtom = atom(0);

// オブジェクト型のatom
export const userAtom = atom<{ name: string; age: number } | null>(null);

// Todoアイテムの型定義
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Todoリストのatom
export const todosAtom = atom<Todo[]>([]);

// フィルター状態のatom
export type Filter = 'all' | 'active' | 'completed';
export const filterAtom = atom<Filter>('all');

// Derived atom（計算されたatom）
// フィルターに基づいてフィルタリングされたTodoリストを返す
export const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);

  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
});

// 非同期atomの例
export const asyncDataAtom = atom(async () => {
  // 非同期処理をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { message: 'データの取得が完了しました！', timestamp: Date.now() };
});
