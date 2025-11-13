import { create } from "zustand"

interface AuthModalStore {
    open: boolean
    redirectTo: string | null
    openModal: (redirectTo?: string) => void
    closeModal: () => void
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    open: false,
    redirectTo: null,
    openModal: (redirectTo) => set({ open: true, redirectTo: redirectTo || null, }),
    closeModal: () => set({
        open: false
    })
}))