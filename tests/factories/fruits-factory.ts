import { Fruit } from "repositories/fruits-repository";

let currentId = 1;

export function createFruit(name: string, price: number): Fruit {
  const fruit: Fruit = {
    id: currentId++,
    name,
    price,
  };
  return fruit;
}
