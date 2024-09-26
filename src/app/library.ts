import { Book } from "./book";
import { User, Role } from "./user";

export class Library {
  private name: string;
  private userCatalog: Map<string, User>;

  constructor(name: string) {
    if (!name || name.length < 4) {
      throw new Error("Library name should have at least 4 characters.");
    }
    this.name = name;
    this.userCatalog = new Map<string, User>();
  }

  public addUser(user: User): void {
    if (this.userCatalog.has(user.userName)) {
      throw new Error("User already exists in the catalog.");
    }
    this.userCatalog.set(user.userName, user);
  }
}
