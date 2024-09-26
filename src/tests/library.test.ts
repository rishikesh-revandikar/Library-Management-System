import { Library } from "../app/library";
import { User, Role } from "../app/user";
import { Book } from "../app/book";

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

  it("should allow a librarian to add a book", () => {
    library.addUser(librarian);
    library.addBook(librarian, book);
    expect(library.viewAvailableBooks().size).toBe(1);
  });

  it("should not allow a non-librarian to add a book", () => {
    const user = new User("user1", Role.USER);
    library.addUser(user);
    expect(() => library.addBook(user, book)).toThrowError(
      "User is not permitted to add books."
    );
  });

  it("should allow a user to borrow a book", () => {
    library.addUser(librarian);
    library.addBook(librarian, book);

    const user = new User("user1", Role.USER);
    library.addUser(user);

    library.borrowBook(user, "9780132350884");
    expect(library.viewAvailableBooks().size).toBe(0);
  });

  it("should throw an error when borrowing a book that is not available", () => {
    const user = new User("user1", Role.USER);
    library.addUser(user);

    expect(() => library.borrowBook(user, "9780132350884")).toThrowError(
      "Book not found."
    );
  });
});
