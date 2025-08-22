import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Todo App</h1>
      <TodoList />
    </div>
  );
}
