import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = 'all' | 'active' | 'completed';

const STORAGE_KEY = 'todolist-todos';

function loadTodos(): Todo[] {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    // localStorage 只能保存字符串，所以这里要把字符串转回数组。
    const parsedTodos = JSON.parse(savedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [newTodoText, setNewTodoText] = useState('');
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    // todos 每次变化，都把最新数组转成字符串保存到浏览器。
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // trim() 会去掉前后的空格，避免添加空任务。
    const text = newTodoText.trim();
    if (!text) {
      setMessage('请输入任务内容。');
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    // 把新任务放到旧任务前面，页面会马上重新显示。
    setTodos((currentTodos) => [todo, ...currentTodos]);
    setNewTodoText('');
    setMessage('');
  }

  function toggleTodo(id: number) {
    // map() 会生成一个新数组，只修改被点击的那一项。
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: number) {
    // filter() 会保留没有被删除的任务。
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function clearCompletedTodos() {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
    cancelEditing();
  }

  function startEditing(todo: Todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
    setMessage('');
  }

  function saveEditing(id: number) {
    const text = editingText.trim();
    if (!text) {
      setMessage('任务内容不能为空。');
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
    setEditingId(null);
    setEditingText('');
    setMessage('');
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingText('');
    setMessage('');
  }

  function handleEditKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    id: number,
  ) {
    if (event.key === 'Enter') {
      saveEditing(id);
    }

    if (event.key === 'Escape') {
      cancelEditing();
    }
  }

  return (
    <main className="page">
      <section className="todo-app" aria-labelledby="page-title">
        <header className="app-header">
          <div>
            <h1 id="page-title">王总任务清单</h1>
            <p>管理今天要完成的事</p>
          </div>

          <div className="panda" aria-label="小熊猫" role="img">
            <span className="panda-ear panda-ear-left" />
            <span className="panda-ear panda-ear-right" />
            <span className="panda-face">
              <span className="panda-eye panda-eye-left" />
              <span className="panda-eye panda-eye-right" />
              <span className="panda-nose" />
              <span className="panda-mouth" />
            </span>
          </div>
        </header>

        <form className="add-form" onSubmit={addTodo}>
          <input
            aria-label="任务内容"
            placeholder="例如：晚上买牛奶"
            value={newTodoText}
            onChange={(event) => setNewTodoText(event.target.value)}
          />
          <button type="submit">添加</button>
        </form>

        {message ? <p className="message">{message}</p> : null}

        <div className="filters" aria-label="任务筛选">
          <button
            className={filter === 'all' ? 'active' : ''}
            type="button"
            onClick={() => setFilter('all')}
          >
            全部
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            type="button"
            onClick={() => setFilter('active')}
          >
            未完成
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            type="button"
            onClick={() => setFilter('completed')}
          >
            已完成
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty">暂无任务</li>
          ) : (
            filteredTodos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <input
                  aria-label={todo.completed ? '取消完成任务' : '完成任务'}
                  checked={todo.completed}
                  type="checkbox"
                  onChange={() => toggleTodo(todo.id)}
                />

                {editingId === todo.id ? (
                  <input
                    className="edit-input"
                    aria-label="编辑任务内容"
                    value={editingText}
                    autoFocus
                    onChange={(event) => setEditingText(event.target.value)}
                    onKeyDown={(event) => handleEditKeyDown(event, todo.id)}
                  />
                ) : (
                  <span className={todo.completed ? 'todo-text done' : 'todo-text'}>
                    {todo.text}
                  </span>
                )}

                <div className="todo-actions">
                  {editingId === todo.id ? (
                    <>
                      <button type="button" onClick={() => saveEditing(todo.id)}>
                        保存
                      </button>
                      <button type="button" onClick={cancelEditing}>
                        取消
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => startEditing(todo)}>
                        编辑
                      </button>
                      <button type="button" onClick={() => deleteTodo(todo.id)}>
                        删除
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>

        <footer className="todo-summary">
          <div className="stats">
            <span>总任务：{todos.length}</span>
            <span>未完成：{activeCount}</span>
            <span>已完成：{completedCount}</span>
          </div>

          <button
            type="button"
            disabled={completedCount === 0}
            onClick={clearCompletedTodos}
          >
            清除已完成
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
