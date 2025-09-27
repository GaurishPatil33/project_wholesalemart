import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "./orderStore";

export type Address = {
    reciversName: string
    reciversContact: string
    reciversEmail: string
    houseNo_Or_Name: string
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isSelected?: boolean
    isDefault?: boolean
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: Address[];
    isLoggedIn: boolean;
};


type UserStore = {
    user: User | null
    orders: Order[]

    login: (user: Omit<User, "isLoggedIn" | "address">) => void
    logout: () => void
    updateUser: (updates: Partial<User>) => void

    addAddress: (address: Address) => void
    updateAddress: (index: number, address: Address) => void
    removeAddress: (index: number) => void

    setSelectedAddress: (index: number) => void
    setDefaultAddress: (index: number) => void
}


export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            orders: [],

            login: (user) => {
                set({ user: { ...user, isLoggedIn: true, address: [] }, })
            },

            logout: () => {
                set({ user: null })
            },

            updateUser: (updates) => {
                const u = get().user;
                if (!u) return
                set({ user: { ...u, ...updates } })
            },

            addAddress(address) {
                const u = get().user;
                if (!u) return

                // const hasDefault = u.address?.some(a => a.isDefault)

                set({
                    user: {
                        ...u,
                        address: [
                            ...(u.address?.map(a => ({ ...a, isSelected: false, isDefault: address.isDefault ? false : a.isDefault })) || []),
                            { ...address, isSelected: true, isDefault: address.isDefault || !u.address?.some(a => a.isDefault) }]
                    }
                })
            },
            updateAddress: (index, address) => {
                const u = get().user;
                if (!u) return
                set({
                    user: {
                        ...u, address: u.address?.map((a, i) => (i === index ? { ...address, isSelected: a.isSelected, isDefault: a.isDefault } : a))
                    }
                })
            },
            removeAddress: (index) => {
                const u = get().user;
                if (!u) return

                let update = u.address?.filter((_, i) => i !== index) || []

                if (update.length > 0 && !update.some(a => a.isDefault)) update[0].isDefault = true

                if (update.length > 0 && !update.some(a => a.isSelected)) update[0].isSelected = true

                set({
                    user: {
                        ...u, address: update
                    }
                })
            },
            setSelectedAddress: (index) => {
                const u = get().user;
                if (!u) return
                set({
                    user: {
                        ...u, address: u.address?.map((a, i) => ({
                            ...a, isSelected: i === index
                        }))
                    }
                })
            },
            setDefaultAddress(index) {
                const u = get().user;
                if (!u) return
                set({
                    user: {
                        ...u, address: u.address?.map((a, i) => ({
                            ...a, isDefault: i === index
                        }))
                    }
                })
            },
        }),
        { name: "user-store" }
    )
);