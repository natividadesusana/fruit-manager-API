import prisma from "database";
import { faker } from "@faker-js/faker";

export async function buildFruit(name?: string, price?: number) {
  // criando cenário de teste
  return await prisma.fruit.create({
    data: {
      name: name || faker.commerce.product(),
      price: price || faker.number.int({
          min: 1,
          max: 99,
        }),
    },
  });
}
