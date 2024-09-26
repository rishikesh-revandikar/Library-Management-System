import { Book } from "../app/book";

describe("Book Class", () => {
  it("should create a book with valid attributes", () => {
    const book = new Book(
      "9780132350884",
      "Clean Code",
      "Robert Cecil Martin",
      2012
    );
    expect(book.getISBN()).toBe("9780132350884");
  });

  it("should throw an error if required fields are missing", () => {
    expect(
      () => new Book("", "Clean Code", "Robert Cecil Martin", 2012)
    ).toThrowError("All fields are required.");
  });
});
