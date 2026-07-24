import { faker } from "@faker-js/faker";

export class RandomDataUtil {
  static getFirstName(): string {
    return faker.person.firstName();
  }
  static getLastName(): string {
    return faker.person.lastName();
  }
  static getEmail(): string {
    return faker.internet.email();
  }

  static getPhoneNumber(): string {
    return faker.phone.number();
  }
  static getUsername(): string {
    return faker.internet.username();
  }

  static getPassword(): string {
    return faker.internet.password();
  }

  static gerRamdomState(): string {
    return faker.location.state();
  }

  static gerRamdomcity(): string {
    return faker.location.city();
  }

  static gerRamdomPin(): string {
    return faker.location.zipCode();
  }

  static getRandomPassword(lenght: number = 10): string {
    return faker.internet.password({ length });
  }

  static gerRamdomAlphanumeric(lenght: number): string {
    return faker.string.alphanumeric();
  }
  static getRandomNumeric(lenght: number): string {
    return faker.string.numeric(length);
  }

  static getRandomUUID(): string {
    return faker.string.uuid();
  }
}
