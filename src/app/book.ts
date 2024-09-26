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

  public getISBN(): string {
    return this.isbn;
  }
}
