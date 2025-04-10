import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function randomValue(value: 'firstName' | 'lastName' | 'email' | 'name' | `phone`) {
  switch (value) {
    case 'firstName':
      return faker.person.firstName();
    case 'lastName':
      return faker.person.lastName();
    case 'email':
      return faker.internet.email({ provider: 'fakerjs.dev' });
    case 'name':
      return faker.internet.displayName();
    case 'phone':
      return faker.number.int({ min: 1000, max: 9999 });
  }
}
