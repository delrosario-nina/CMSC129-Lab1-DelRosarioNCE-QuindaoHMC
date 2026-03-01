export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export type CreateUserDTO = Omit<User, "_id" | "createdAt">;
