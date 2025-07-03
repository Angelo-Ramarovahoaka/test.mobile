// data/users.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

// Initial mock data
export const mockUsers: User[] = [
  {
    id: "1",
    email: "a@gmail.com",
    name: "John Doe",
    password: "123456"
  }
];

// Storage functions
export const userStorage = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const stored = await AsyncStorage.getItem('users');
      return stored ? JSON.parse(stored) : [...mockUsers];
    } catch {
      return [...mockUsers];
    }
  },
  
  addUser: async (user: User): Promise<void> => {
    const users = await userStorage.getAllUsers();
    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));
  },
  
  findUserByEmail: async (email: string): Promise<User | undefined> => {
    const users = await userStorage.getAllUsers();
    return users.find(u => u.email === email);
  }
};