import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosClient from "@/config/axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface ClientResponse {
  client: {
    id: number;
    name: string;
    email: string;
  };
}

interface State {
  clientId: number;
  login: (email: string, password: string) => void;
}

export const useAuthStore = create<State>()(
  persist(
    (set, get) => ({
      clientId: 0,
      login: async (email: string, password: string) => {
        const { data } = await axiosClient.post<ClientResponse>("/client/login", {
          email,
          password,
        });
        set({ clientId: data.client.id });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
    
    }
  )
);
