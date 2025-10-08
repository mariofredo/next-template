import { API_ROUTES } from '@/consts';
import { create } from 'zustand';

type UserState = {
  user: any;
  setUser: (user: any) => void;
};
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
