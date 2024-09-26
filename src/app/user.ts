// Enum representing the different roles a user can have in the library system
export enum Role {
  LIBRARIAN = "LIBRARIAN",
  USER = "USER",
}

// Class representing a user in the library system
export class User {
  userName: string;
  role: Role;

  constructor(userName: string, role: Role) {
    this.userName = userName;
    this.role = role;
  }

  // Method to check if the user has permission to add books to the library
  public isPermittedToAddBook(): boolean {
    return this.role === Role.LIBRARIAN;
  }
}
