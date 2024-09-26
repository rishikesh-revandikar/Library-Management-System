import { Library, User, Book, Role } from "../app";

describe("Library Class", () => {
  // Declare variables for the Library, User (librarian), and Book to be used in tests
  let library: Library;
  let librarian: User;
  let book: Book;

  // Set up the test environment before each test case
  beforeEach(() => {
    library = new Library("Public Library"); // Create a new Library instance
    librarian = new User("librarian1", Role.LIBRARIAN); // Create a librarian User
    book = new Book("9780132350884", "Clean Code", "Robert Cecil Martin", 2012); // Create a Book instance
  });

  // Test case: Adding a user to the library
  it("should add a user to the library", () => {
    library.addUser(librarian);
    expect(() => library.addUser(librarian)).toThrowError(
      "User already exists in the catalog."
    );
  });

  // Test case: Allowing a librarian to add a book
  it("should allow a librarian to add a book", () => {
    library.addUser(librarian);
    library.addBook(librarian, book);
    expect(library.viewAvailableBooks().size).toBe(1);
  });

  // Test case: Preventing a non-librarian from adding a book
  it("should not allow a non-librarian to add a book", () => {
    const user = new User("user1", Role.USER);
    library.addUser(user);
    expect(() => library.addBook(user, book)).toThrowError(
      "User is not permitted to add books."
    );
  });

  // Test case: Allowing a user to borrow a book
  it("should allow a user to borrow a book", () => {
    library.addUser(librarian);
    library.addBook(librarian, book);

    const user = new User("user1", Role.USER);
    library.addUser(user);

    library.borrowBook(user, "9780132350884");
    expect(library.viewAvailableBooks().size).toBe(0);
  });

  // Test case: Throwing an error when borrowing an unavailable book
  it("should throw an error when borrowing a book that is not available", () => {
    const user = new User("user1", Role.USER);
    library.addUser(user);

    expect(() => library.borrowBook(user, "9780132350884")).toThrowError(
      "Book not found."
    );
  });

  // Test case: Allowing a user to return a borrowed book
  it("should allow a user to return a book they have borrowed", () => {
    library.addUser(librarian);
    library.addBook(librarian, book);

    const user = new User("user1", Role.USER);
    library.addUser(user);
    library.borrowBook(user, book.getISBN());

    library.returnBook(user, book.getISBN());

    expect(library.viewAvailableBooks().size).toBe(1);
  });

  // Test case: Throwing an error when returning a book that was not borrowed
  it("should throw an error when a user tries to return a book that was not borrowed", () => {
    const user = new User("user1", Role.USER);
    library.addUser(user);
    library.addBook(librarian, book);

    expect(() => library.returnBook(user, book.getISBN())).toThrowError(
      "Book was not borrowed by any user"
    );
  });

  // Test case: Throwing an error when a user tries to return a book they did not borrow
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
