import { create } from "zustand"

interface Toast {
    message: string | null
    showToast: (msg: string) => void
    clearToast: () => void
}
export const useToast = create<Toast>((set) => ({
    message: null,
    showToast: (msg) => {
        set({ message: msg })
        setTimeout(() => set({ message: null }),3000)
    },
    clearToast: () => set({ message: null })
}))