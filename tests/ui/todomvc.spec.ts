import { expect, test } from '../../src/fixtures/app-fixture';
import { todoItems } from '../../src/data/todo.data';
import { invalidTodoItems } from '../../src/data/todo.invalid.data';

test.describe('TodoMVC tests', () => {
  test('should add a new todo item', async ({ app }) => {
    await app.todoMvc.expectNewTodoInputVisible();
    await app.todoMvc.addTodo(todoItems[0]);
    await app.todoMvc.expectTodoVisible(todoItems[0]);
    await app.todoMvc.expectNewTodoInputEmpty();
  });

  test('should filter todos by all/active/completed', async ({ app }) => {
    await app.todoMvc.expectNewTodoInputVisible();

    const todos = [todoItems[0], todoItems[1], todoItems[2]];
    for (const todo of todos) {
      await app.todoMvc.addTodo(todo);
      await app.todoMvc.expectTodoVisible(todo);
    }

    await app.todoMvc.setTodoCompleted(todos[0], true);
    await app.todoMvc.expectTodoCompleted(todos[0]);

    await app.todoMvc.filterCompleted();
    await app.todoMvc.expectTodoVisible(todos[0]);
    await app.todoMvc.expectTodoCount(1);

    await app.todoMvc.filterActive();
    await app.todoMvc.expectTodoCount(todos.length - 1);
    await app.todoMvc.expectTodoNotPresent(todos[0]);

    await app.todoMvc.filterAll();
    await app.todoMvc.expectTodoCount(todos.length);
    await app.todoMvc.expectTodoVisible(todos[0]);
  });

  test('should delete completed todo item', async ({ app }) => {
    await app.todoMvc.expectNewTodoInputVisible();
    await app.todoMvc.addTodo(todoItems[1]);
    await app.todoMvc.expectTodoVisible(todoItems[1]);

    await app.todoMvc.setTodoCompleted(todoItems[1], true);
    await app.todoMvc.clearCompleted();

    await app.todoMvc.expectTodoNotPresent(todoItems[1]);
  });

  test('should persist todos after reload', async ({ app }) => {
    await app.todoMvc.addTodo(todoItems[2]);
    await app.todoMvc.addTodo(todoItems[3]);
    await app.todoMvc.expectTodoCount(2);

    await app.todoMvc.reload();
    await app.todoMvc.expectTodoCount(2);
    await app.todoMvc.expectTodoVisible(todoItems[2]);
    await app.todoMvc.expectTodoVisible(todoItems[3]);
  });

  test('should edit a todo title', async ({ app }) => {
    const original = todoItems[3];
    await app.todoMvc.addTodo(original);
    await app.todoMvc.expectTodoVisible(original);

    const edited = todoItems[4];
    await app.todoMvc.editTodoTitle(original, edited);

    await app.todoMvc.expectTodoVisible(edited);
    await app.todoMvc.expectTodoNotPresent(original);
  });

  test('should reject invalid todo titles', async ({ app }) => {
    for (const invalid of invalidTodoItems) {
      await expect(async () => app.todoMvc.addTodo(invalid)).rejects.toThrow();
    }
  });

  test('should reject duplicate todo titles', async ({ app }) => {
    await app.todoMvc.addTodo(todoItems[1]);
    await app.todoMvc.expectTodoVisible(todoItems[1]);
    await expect(async () => app.todoMvc.addTodo(todoItems[1])).rejects.toThrow(
      /Duplicate todo titles are not allowed/,
    );
  });
});
