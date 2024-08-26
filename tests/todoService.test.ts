import { PrismaClient } from "@prisma/client";
import { TodoRepository } from "../todoRepository";
import { TodoService } from "../todoService";

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
});
