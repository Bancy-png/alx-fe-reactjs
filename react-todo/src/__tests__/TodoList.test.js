import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
    expect(screen.getByText(/Write tests/i)).toBeInTheDocument();
    expect(screen.getByText(/Ship feature/i)).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByLabelText("todo-input");
    const form = screen.getByRole("form", { name: /add-todo-form/i });

    fireEvent.change(input, { target: { value: "New todo item" } });
    fireEvent.submit(form);

    expect(screen.getByText("New todo item")).toBeInTheDocument();
  });

  test("toggles a todo when clicked", () => {
    render(<TodoList />);
    const item = screen.getByTestId("todo-item-1"); // "Learn React" initially not completed
    expect(item).toHaveStyle({ textDecoration: "none" });

    fireEvent.click(item);
    expect(item).toHaveStyle({ textDecoration: "line-through" });

    fireEvent.click(item);
    expect(item).toHaveStyle({ textDecoration: "none" });
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const item = screen.getByTestId("todo-item-2"); // "Write tests"
    const delBtn = screen.getByLabelText("delete-2");

    fireEvent.click(delBtn);
    expect(item).not.toBeInTheDocument();
  });
});
