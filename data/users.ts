export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "test@example.com",
    name: "John Doe",
    password: "123456"
  }
];
