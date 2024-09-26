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

  it("should allow a user to return a book they have borrowed", () => {
    library.addUser(librarian);
    library.addBook(librarian, book);

    const user = new User("user1", Role.USER);
    library.addUser(user);
    library.borrowBook(user, book.getISBN());

    library.returnBook(user, book.getISBN());

    expect(library.viewAvailableBooks().size).toBe(1);
  });

  it("should throw an error when a user tries to return a book that was not borrowed", () => {
    const user = new User("user1", Role.USER);
    library.addUser(user);
    library.addBook(librarian, book);

    expect(() => library.returnBook(user, book.getISBN())).toThrowError(
      "Book was not borrowed by any user"
    );
  });

  it("should throw an error when a user tries to return a book they did not borrow", () => {
    const user1 = new User("user1", Role.USER);
    const user2 = new User("user2", Role.USER);
    library.addUser(librarian);
    library.addUser(user1);
    library.addUser(user2);
    library.addBook(librarian, book);

    library.borrowBook(user1, book.getISBN());

    expect(() => library.returnBook(user2, book.getISBN())).toThrowError(
      "Book was not borrowed by this user"
    );
  });
});
