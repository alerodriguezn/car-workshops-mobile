import { Workshop } from "@/interfaces/workshop";
import { create } from "zustand";
import axiosClient from "@/config/axiosClient";

export interface WorkshopList {
    workshops: Workshop[];
}

interface State {
  workshops: Workshop[];
  fetchWorkshops: () => void;
  status: "idle" | "loading" | "success" | "error";
}

export const useWorkshopStore = create<State>()((set, get) => ({
  workshops: {} as Workshop[],
  status: "idle",
  fetchWorkshops: async () => {
    set({ status: "loading" });
    const { data } = await axiosClient.get<WorkshopList>("/workshop");
    set({ workshops: data.workshops });
    set({ status: "success" });
  },
}));
