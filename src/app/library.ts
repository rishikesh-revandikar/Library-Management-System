import { Book } from "./book";
import { User } from "./user";

// Class representing a library system
export class Library {
  private name: string;
  private userCatalog: Map<string, User>;
  private bookInventory: Map<string, Book>;
  private borrowedBooks: Map<string, string>;

  constructor(name: string) {
    if (!name || name.length < 4) {
      throw new Error("Library name should have at least 4 characters.");
    }
    this.name = name;
    this.userCatalog = new Map<string, User>();
    this.bookInventory = new Map<string, Book>();
    this.borrowedBooks = new Map<string, string>();
  }

  // Method to add a user to the library
  public addUser(user: User): void {
    if (this.userCatalog.has(user.userName)) {
      throw new Error("User already exists in the catalog.");
    }
    this.userCatalog.set(user.userName, user);
  }

  // Method to add a book to the library's inventory
  public addBook(user: User, book: Book): void {
    if (!user.isPermittedToAddBook()) {
      throw new Error("User is not permitted to add books.");
    }
    this.bookInventory.set(book.getISBN(), book);
  }

  // Method to view all available books in the library
  public viewAvailableBooks(): Map<string, Book> {
    return new Map(this.bookInventory);
  }

  // Method for a user to borrow a book from the library
  public borrowBook(user: User, isbn: string): void {
    if (!this.bookInventory.has(isbn)) {
      throw new Error("Book not found.");
    }
    if (this.borrowedBooks.has(isbn)) {
      throw new Error("Book is already borrowed.");
    }
    this.borrowedBooks.set(isbn, user.userName);
    this.bookInventory.delete(isbn);
  }

  // Method for a user to return a borrowed book to the library
  public returnBook(user: User, isbn: string): void {
    if (!this.borrowedBooks.has(isbn)) {
      throw new Error("Book was not borrowed by any user.");
    }
    if (this.borrowedBooks.get(isbn) !== user.userName) {
      throw new Error("Book was not borrowed by this user");
    }
    this.bookInventory.set(
      isbn,
      this.borrowedBooks.get(isbn) as unknown as Book
    );
    this.borrowedBooks.delete(isbn);
  }
}
