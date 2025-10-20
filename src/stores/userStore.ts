import { create } from 'zustand';
import {User} from "@/types/user";

type State = {
  user: User | null
}

type Actions = {
  setUser: (user: User) => void;
  getUser: () => void;
  getUserRole: () => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<State & Actions>((set, get) => ({
  user: null,
  setUser: (user) => set(() => ({
    user: user
  })),
  getUser: () => {
    return get().user;
  },
  getUserRole: () => {
    if (get().user === null) {
      return null;
    }
    return get().user?.role;
  },
  logout: () => set(({
    user: null
  })),
  isLoggedIn: () => {
    return get().user !== null;
  }

}));