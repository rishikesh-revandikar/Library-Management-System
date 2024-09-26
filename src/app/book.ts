// Class representing a book in the library system
export class Book {
  isbn: string;
  title: string;
  author: string;
  publicationYear: number;

  constructor(
    isbn: string,
    title: string,
    author: string,
    publicationYear: number
  ) {
    this.validateRequiredAttributes(isbn, title, author, publicationYear);
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }

  // Private method to validate that all required attributes are present
  private validateRequiredAttributes(
    isbn: string,
    title: string,
    author: string,
    publicationYear: number
  ) {
    if (!isbn || !title || !author || !publicationYear) {
      throw new Error("All fields are required.");
    }
  }

  // Public method to get the ISBN of the book
  public getISBN(): string {
    return this.isbn;
  }
}
