import { Library } from "../app/library";
import { User, Role } from "../app/user";

describe("Library Class", () => {
  let library: Library;
  let librarian: User;

  beforeEach(() => {
    library = new Library("Public Library");
    librarian = new User("librarian1", Role.LIBRARIAN);
  });

  it("should add a user to the library", () => {
    library.addUser(librarian);
    expect(() => library.addUser(librarian)).toThrowError(
      "User already exists in the catalog."
    );
  });
});
