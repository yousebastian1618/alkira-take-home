import { create } from 'zustand';
import {setTimeout} from "node:timers";

type State = {
  status: 'success' | 'error' | "";
  statusTitle: string;
  statusMessage: string;
  statusShowing: boolean;
  statusTimeout: NodeJS.Timeout | null;
  loading: boolean;
}

type Actions = {
  showStatus: (status: 'success' | 'error' | "", statusTitle: string, statusMessage: string) => void;
  clearStatus: () => void;
  toggleLoading: (toggle?: boolean) => void
}

export const useStatusStore = create<State & Actions>((set, get) => ({
  status: "",
  statusTitle: "",
  statusMessage: "",
  statusShowing: false,
  statusTimeout: null,
  loading: false,

  showStatus: (status, statusTitle, statusMessage) => {
    const prevTimeout = get().statusTimeout;
    if (prevTimeout) clearTimeout(prevTimeout);

    set({
      status,
      statusTitle,
      statusMessage,
      statusShowing: true,
      loading: false
    })

    const timeout = setTimeout(() => {
      get().clearStatus();
    }, 5000);

    set({ statusTimeout: timeout });
  },
  clearStatus: () => {
    const currentTimeout = get().statusTimeout;
    if (currentTimeout) clearTimeout(currentTimeout);
    set({
      status: "",
      statusMessage: '',
      statusShowing: false,
      statusTimeout: null,
    });
  },
  toggleLoading: (toggle?: boolean) => set(({
    loading: toggle !== undefined ? toggle : !get().loading
  })),
}))