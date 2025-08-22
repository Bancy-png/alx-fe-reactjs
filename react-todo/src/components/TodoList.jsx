import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Write tests", completed: true },
  { id: 3, text: "Ship feature", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  function addTodo(text) {
    const nextId = Math.max(0, ...todos.map((t) => t.id)) + 1;
    setTodos((prev) => [...prev, { id: nextId, text, completed: false }]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <section>
      <h1>Todo List</h1>

      <AddTodoForm onAdd={addTodo} />

      <ul aria-label="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={`todo-item-${todo.id}`}
            onClick={() => toggleTodo(todo.id)}
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
              userSelect: "none",
              marginBottom: 6,
            }}
            aria-pressed={todo.completed}
            role="button"
            title="Click to toggle"
          >
            {todo.text}{" "}
            <button
              aria-label={`delete-${todo.id}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              style={{ marginLeft: 8 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
