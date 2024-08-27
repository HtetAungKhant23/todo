import { PrismaClient } from "@prisma/client";
import { TodoRepository } from "../src/core/infrastructure/todoRepository";
import { TodoService } from "../src/core/usecases/todoService";

const prisma = new PrismaClient();
const todoRepo = new TodoRepository(prisma);
const todoService = new TodoService(todoRepo);

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.todo.deleteMany();
});

afterAll(async () => {
  await prisma.todo.deleteMany();
  await prisma.$disconnect();
});

describe("Create Todo", () => {
  it("should create todo", async () => {
    const todo = await todoService.create("Buy milk", "Buy milk from g&g");
    expect(todo.title).toBe("Buy milk");
    expect(todo.description).toBe("Buy milk from g&g");
    expect(todo.completed).toBe(false);
  });

  it("should be get all todos", async () => {
    await todoService.create("One", "one desc");
    await todoService.create("Two", "two desc");
    const todos = await todoService.get();
    expect(todos.length).toBe(2);
  });

  it("should be get todo by id", async () => {
    const newTodo = await todoService.create("oknasa", "wanna oknasa");
    const todo = await todoService.getById(newTodo.id);
    expect(todo).not.toBeNull();
    if (!todo) return;
    expect(todo.id).toBe(newTodo.id);
    expect(todo.title).toBe(newTodo.title);
  });

  it("should return null if todo id does not exist", async () => {
    const todo = await todoService.getById("1");
    expect(todo).toBeNull();
  });

  it("should update todo to complete with id", async () => {
    const newTodo = await todoService.create("oknasa", "wanna oknasa");
    const updTodo = await todoService.updateComplete(newTodo.id, true);
    expect(updTodo.completed).toBe(true);
  });

  it("should delete todo with id", async () => {
    const newTodo = await todoService.create("oknasa", "wanna oknasa");
    const toDelTodo = await todoService.getById(newTodo.id);
    expect(toDelTodo).not.toBeNull();
    if (!toDelTodo) return;
    await todoService.delete(toDelTodo.id);
    const deletedTodo = await todoService.getById(toDelTodo.id);
    expect(deletedTodo).toBeNull();
  });
});
