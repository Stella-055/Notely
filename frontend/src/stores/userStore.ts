import { create } from "zustand";
import type { StateCreator } from "zustand";

import { persist } from "zustand/middleware";
interface UserStoreType {
  user: { username: string } | null;
  entry: null | string;
  setEntry: (entry: string) => void;
  setUserName: (user: { username: string }) => void;
  logoutuser: () => void;
}

const userStore: StateCreator<UserStoreType> = (set) => {
  return {
    user: null,
    entry: null,

    setUserName: (user: { username: string }) => {
      return set({ user });
    },
    logoutuser: () => {
      return set({ user: null });
    },
    setEntry: (entry: string) => {
      return set({ entry });
    },
  };
};

const useUser = create(persist(userStore, { name: "user-state" }));

export default useUser;
