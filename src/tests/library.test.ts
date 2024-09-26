import { Library } from "../src/library";
import { Book } from "../src/book";
import { User, Role } from "../src/user";


describe("Library Class", () => {
  let library: Library;
  let librarian: User;
  let book: Book;

  beforeEach(() => {
    library = new Library("Public Library");
    librarian = new User("librarian1", Role.LIBRARIAN);
    book = new Book("9780132350884", "Clean Code", "Robert Cecil Martin", 2012);
  });

  it("should add a user to the library", () => {
    library.addUser(librarian);
    expect(() => library.addUser(librarian)).toThrowError(
      "User already exists in the catalog."
    );
  });

  
});