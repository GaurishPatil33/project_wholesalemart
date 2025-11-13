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
    type?: string
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    password: string
    avatar?: string
    address?: Address[];
    isLoggedIn: boolean;
};


type UserStore = {
    user: User | null
    users: User[]
    orders: Order[]

    signup: (newUser: Omit<User, "isLoggedIn" | "address"> & { password: string }) => { success: boolean; message: string };
    login: (identifier: string, password: string) => { success: boolean; message: string };
    logout: () => void;
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
            users: [],        // ✅ stored signup users
            orders: [],

            signup: (newUser) => {
                const { users } = get();
                const exists = users.some(u => u.email === newUser.email);

                if (exists) return { success: false, message: "User already exists" };

                const userToSave: User = {
                    ...newUser,
                    isLoggedIn: false,
                    address: []
                };

                set({ users: [...users, userToSave] });
                return { success: true, message: "Signup successful" };
            },

            login: (identifier: string, password: string) => {
                const { users } = get();

                // Match user where email OR phone matches the input
                const match = users.find(
                    (u) =>
                        (u.email === identifier || u.phone === identifier) &&
                        u.password === password
                );

                if (!match) return { success: false, message: "Invalid credentials" };

                set({ user: { ...match, isLoggedIn: true } });
                return { success: true, message: "Login successful" };
            },


            logout: () => set({ user: null }),

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

                const update = u.address?.filter((_, i) => i !== index) || []

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