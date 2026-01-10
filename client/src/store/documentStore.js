import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDocumentStore = create(
  persist(
    (set) => ({
      document: null,
      setDocument: (doc) => set({ document: doc }),
      clearDocument: () => set({ document: null }),
    }),
    {
      name: 'document-store',
      partialize: (state) => ({ document: state.document }),
    }
  )
);
