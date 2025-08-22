import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form">
      <input
        placeholder="Add a todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="todo-input"
      />
      <button type="submit">Add</button>
    </form>
  );
}
