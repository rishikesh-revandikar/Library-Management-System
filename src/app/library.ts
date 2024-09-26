import { Book } from "./book";
import { User, Role } from "./user";

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

  public addUser(user: User): void {
    if (this.userCatalog.has(user.userName)) {
      throw new Error("User already exists in the catalog.");
    }
    this.userCatalog.set(user.userName, user);
  }

  public addBook(user: User, book: Book): void {
    if (!user.isPermittedToAddBook()) {
      throw new Error("User is not permitted to add books.");
    }
    this.bookInventory.set(book.getISBN(), book);
  }

  public viewAvailableBooks(): Map<string, Book> {
    return new Map(this.bookInventory);
  }

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
}
