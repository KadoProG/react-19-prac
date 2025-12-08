import { useAtom, useAtomValue } from 'jotai';
import { todosAtom, filterAtom, filteredTodosAtom, type Todo, type Filter } from '../atoms';
import { useState } from 'react';

/**
 * Todoリストの例
 *
 * 複数のatomを連携させて使用する例です。
 * - todosAtom: Todoリストの状態
 * - filterAtom: フィルター状態
 * - filteredTodosAtom: フィルターに基づいて計算されたTodoリスト（derived atom）
 */
export const TodoExample = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  const filteredTodos = useAtomValue(filteredTodosAtom);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filters: Filter[] = ['all', 'active', 'completed'];
  const filterLabels: Record<Filter, string> = {
    all: 'すべて',
    active: '未完了',
    completed: '完了',
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        2. Todoリスト（複数のatomの連携）
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        複数のatomを連携させて使用する例です。
        <code className="mx-1 rounded bg-gray-100 px-2 py-1 text-xs">filteredTodosAtom</code>
        はderived atomで、他のatomの値に基づいて計算されます。
      </p>

      {/* Todo追加フォーム */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいTodoを入力..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
        <button
          onClick={addTodo}
          className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          追加
        </button>
      </div>

      {/* フィルター */}
      <div className="mb-4 flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Todoリスト */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <p className="py-4 text-center text-gray-500">Todoがありません</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 cursor-pointer"
              />
              <span
                className={`flex-1 ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        合計: {todos.length}件 / 未完了: {todos.filter((t) => !t.completed).length}件 / 完了:{' '}
        {todos.filter((t) => t.completed).length}件
      </div>
    </div>
  );
};
