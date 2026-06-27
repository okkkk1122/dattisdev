import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'کاربر' | 'مدیر';
  status: 'فعال' | 'غیرفعال';
  joinDate: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'علی احمدی', email: 'ali@example.com', role: 'کاربر', status: 'فعال', joinDate: '2024-01-15' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'مدیر', status: 'فعال', joinDate: '2024-01-10' },
  { id: 3, name: 'محمد الخالدی', email: 'mohammed@example.com', role: 'کاربر', status: 'غیرفعال', joinDate: '2024-01-05' },
  { id: 4, name: 'رضا محمدی', email: 'reza@example.com', role: 'کاربر', status: 'فعال', joinDate: '2023-12-28' },
  { id: 5, name: 'John Doe', email: 'john@example.com', role: 'کاربر', status: 'فعال', joinDate: '2023-12-25' },
];

interface UsersState {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'joinDate'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
  getUser: (id: number) => User | undefined;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      addUser: (user) => {
        const newUser: User = {
          ...user,
          id: Date.now(),
          joinDate: new Date().toISOString().split('T')[0],
        };
        set((state) => ({
          users: [newUser, ...state.users],
        }));
      },
      updateUser: (id, updatedUser) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          ),
        }));
      },
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      },
      getUser: (id) => {
        return get().users.find((user) => user.id === id);
      },
    }),
    {
      name: 'dattisdev-users-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: true,
    }
  )
);



