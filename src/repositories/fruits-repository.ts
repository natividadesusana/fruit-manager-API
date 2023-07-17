import { FruitInput } from "../services/fruits-service";
import prisma from "../database";

function getFruits() {
  return prisma.fruit.findMany();
}

function getSpecificFruit(id: number) {
  return prisma.fruit.findUnique({
    where: {
      id,
    },
  });
}

function getSpecificFruitByName(name: string) {
  return prisma.fruit.findUnique({
    where: {
      name,
    },
  });
}

function insertFruit(fruit: FruitInput) {
  return prisma.fruit.create({
    data: fruit,
  });
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit,
};

export default fruitsRepository;
