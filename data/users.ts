import * as FileSystem from 'expo-file-system';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  imageUri?: string;
}

const USERS_FILE_PATH = FileSystem.documentDirectory + 'users.json';
console.log('USERS_FILE_PATH:', USERS_FILE_PATH);

// Données initiales avec tes utilisateurs
const initialUsers: User[] = [
  {
    id: "1",
    email: "a@gmail.com",
    name: "John Doe",
    password: "8d969eef6ecad3c29a3a629280e686cff8fab2e5e5d7a0d6a2c24d3aef8b7e7a", // hash of "123456"
    imageUri: "./../assets/images/banner/image.png" // Exemple de chemin d'image
  },
  {
    id: "2",
    email: "ra@ra.com",
    name: "rakoto",
    password: "8d969eef6ecad3c29a3a629280e686cff8fab2e5e5d7a0d6a2c24d3aef8b7e7a", // hash of "123456"
    imageUri: "./../assets/images/banner/image.png" // Exemple de chemin d'image

  }
];

// Initialise le fichier avec les données de départ si nécessaire
const initializeUsersFile = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(USERS_FILE_PATH);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(
        USERS_FILE_PATH, 
        JSON.stringify(initialUsers, null, 2)
      );
      console.log('Fichier users.json créé avec les données initiales');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du fichier:', error);
  }
};

export const userStorage = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      await initializeUsersFile();
      const fileContent = await FileSystem.readAsStringAsync(USERS_FILE_PATH);
      const users = JSON.parse(fileContent);
      
      // Vérifie que le fichier contient bien des données
      if (!users || users.length === 0) {
        // Si le fichier est vide, on réinitialise avec les données par défaut
        await FileSystem.writeAsStringAsync(
          USERS_FILE_PATH, 
          JSON.stringify(initialUsers, null, 2)
        );
        return initialUsers;
      }
      
      return users;
    } catch (error) {
      console.error('Erreur lors de la lecture des utilisateurs:', error);
      return [...initialUsers];
    }
  },

  addUser: async (user: Omit<User, 'id'>): Promise<User> => {
    try {
      const users = await userStorage.getAllUsers();
      
      // Vérifie si l'utilisateur existe déjà
      const userExists = users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (userExists) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }
      
      const newUser = {
        ...user,
        id: Date.now().toString(),
      };
      
      const updatedUsers = [...users, newUser];
      await FileSystem.writeAsStringAsync(
        USERS_FILE_PATH, 
        JSON.stringify(updatedUsers, null, 2)
      );
      
      console.log('Nouvel utilisateur ajouté:', newUser);
      return newUser;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      throw error;
    }
  },

  findUserByEmail: async (email: string): Promise<User | undefined> => {
    try {
      const users = await userStorage.getAllUsers();
      return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
      console.error('Erreur lors de la recherche de l\'utilisateur:', error);
      return undefined;
    }
  },

  // Méthode supplémentaire pour réinitialiser le fichier (utile pour les tests)
  resetUsersFile: async (): Promise<void> => {
    try {
      await FileSystem.writeAsStringAsync(
        USERS_FILE_PATH, 
        JSON.stringify(initialUsers, null, 2)
      );
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du fichier:', error);
      throw error;
    }
  }
};