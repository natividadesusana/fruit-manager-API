import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/notfound-error";
import fruitsRepository from "../repositories/fruits-repository";
import { Fruit } from "@prisma/client";

export type FruitInput = Omit<Fruit, "id">;

async function getFruits() {
  const fruits = await fruitsRepository.getFruits();
  return fruits;
}

async function getSpecificFruit(id: number) {
  const fruit = await fruitsRepository.getSpecificFruit(id);
  if (!fruit) {
    throw notFoundError();
  }

  return fruit;
}

async function createFruit(fruit: FruitInput) {
  const fruitAlreadyRegistered = await fruitsRepository.getSpecificFruitByName(
    fruit.name
  );
  if (fruitAlreadyRegistered) {
    throw conflictError();
  }

  await fruitsRepository.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit,
};

export default fruitsService;
