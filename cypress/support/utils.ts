import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function randomValue(value: "firstName" | "lastName") {
  switch (value) {
    case "firstName":
      return faker.person.firstName();
    case "lastName":
      return faker.person.lastName();
  }
}
