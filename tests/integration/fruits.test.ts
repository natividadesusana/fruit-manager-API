import supertest from "supertest";
import app from "../../src/app";
import { FruitInput } from "services/fruits-service";
import prisma from "database";
import { buildFruit } from "../factories/fruits-factory";

const server = supertest(app);

beforeEach(async () => {
  await prisma.fruit.deleteMany();
});

describe("POST /fruits", () => {
  // teste onde tudo funciona
  it("should create a fruit and return 201", async () => {
    const fruitInput: FruitInput = {
      name: "apple",
      price: 99,
    };

    const { status } = await server.post("/fruits").send(fruitInput);
    expect(status).toBe(201);

    // validando se realmente está no banco
    const fruits = await prisma.fruit.findMany();
    expect(fruits).toHaveLength(1);
    const apple = fruits[0];
    expect(apple).toEqual({
      id: expect.any(Number),
      name: fruitInput.name,
      price: fruitInput.price,
    });
  });

  it("should return 422 when body is incomplete", async () => {
    const { status } = await server.post("/fruits").send({ name: "orange" });
    expect(status).toBe(422);
  });

  it("should return 409 when trying to insert the same fruit twice", async () => {
    // criando cenário de teste
    const fruit = await buildFruit();

    const { status: newStatus } = await server.post("/fruits").send({
      name: fruit.name,
      price: 123,
    });
    expect(newStatus).toBe(409);
  });
});

describe("GET /fruits", () => {
  // GET geralzão
  // 1 - teste onde as frutas são retornadas com sucesso
  it("should return all fruits", async () => {
    await buildFruit("apple");
    await buildFruit("orange");
    await buildFruit("strawberry");
    await buildFruit("banana");

    const { body, status } = await server.get("/fruits");
    expect(status).toBe(200);
    expect(body).toHaveLength(4);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });

  // 1.1 - teste onde não há frutas []
  it("should return an empty array when there are no fruits", async () => {
    const { body, status } = await server.get("/fruits");
    expect(status).toBe(200);
    expect(body).toHaveLength(0);
  });

  // GET :id
  // 1 - caso onde o id é valido e precisa retornar uma fruta já cadastrada (com os campos corretos)
  it("should return a fruit", async () => {
    const fruit = await buildFruit();
    const { body, status } = await server.get(`/fruits/${fruit.id}`);
    expect(status).toBe(200);
    expect(body).toEqual(fruit);
  });

  // 2 - caso onde o id é inválido (algo que não é número, menor ou igual a zero)
  it("should return 400 when id param is invalid", async () => {
    const { status } = await server.get(`/fruits/string`);
    expect(status).toBe(400);
  });

  // 3 - caso onde o id é válido mas não encontra nenhum registro => 404
  it("should return 404 when fruit does not exists", async () => {
    const { status } = await server.get(`/fruits/1`);
    expect(status).toBe(404);
  });
});
