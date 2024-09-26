export enum Role {
  LIBRARIAN = "LIBRARIAN",
  USER = "USER",
}

export class User {
  userName: string;
  role: Role;

  constructor(userName: string, role: Role) {
    this.userName = userName;
    this.role = role;
  }

  public isPermittedToAddBook(): boolean {
    return this.role === Role.LIBRARIAN;
  }
}
