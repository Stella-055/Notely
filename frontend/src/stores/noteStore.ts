import { create } from "zustand";
import type { StateCreator } from "zustand";

interface UserStoreType {
  entry: null | string;
  setEntry: (entry: string) => void;
}

const noteStore: StateCreator<UserStoreType> = (set) => {
  return {
    entry: null,

    setEntry: (entry: string) => {
      return set({ entry });
    },
  };
};

const notestate = create(noteStore);

export default notestate;
