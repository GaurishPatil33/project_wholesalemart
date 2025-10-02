import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types";
import { Address, User } from "./userStore";


export interface PaymentInfo {
    method: "cod" | "card" | "upi" | "paypal" | "apple" | "google" | "bank";
    status: "pending" | "paid" | "failed" | "refunded";
    transactionId?: string;
}


export interface Order {
    id: string
    items: CartItem[]
    total: number
    createdAt: string
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"

    userId: string
    userInfo: {
        name: string
        phone?: string
        email?: string
    }
    address: Address
    payment: PaymentInfo
}

interface OrderStore {
    orders: Order[]
    lastOrderNumber: Record<number, number>

    addOrder: (items: CartItem[], user: User, address: Address, payment: PaymentInfo) => Order
    addOrderFromCart: (cartItems: CartItem[], user: User, payment: PaymentInfo) => Order
    updateOrderStatus: (id: string, status: Order["status"]) => void
    updatePaymentStatus: (id: string, status: PaymentInfo["status"], transactionId?: string) => void

    removeOrder: (id: string) => void
    clearOrders: () => void

    getOrder: (id: string) => Order | undefined
    getOrders: () => Order[]

    getOrdersByUser: (userId: string) => Order[]
    getLatestOrder: () => Order | undefined

}

export const useOrderStore = create<OrderStore>()(
    persist((set, get) => ({
        orders: [],
        lastOrderNumber: {},

        addOrder: (items, user, address, payment) => {
            const total = items.reduce(
                (sum, item) => sum + (item.ProductConfig.price??item.product.sizes[0].price )* item.ProductConfig.quantity,
                0
            );

            // const selectedAddress = user.address?.find(a => a.isSelected);
            // if (!selectedAddress) throw new Error("No selected Address")

            const orderYear = new Date().getFullYear()
            const seq = (get().lastOrderNumber[orderYear] || 0) + 1
            const orderId = `ORD-${orderYear}-${seq.toString().padStart(4, "0")}`

            const newOrder: Order = {
                // id: Date.now().toString(), // quick unique ID
                id: orderId,
                items,
                total,
                createdAt: new Date().toISOString(),
                status: "pending",
                userId: user.id,
                userInfo: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email
                },
                address,
                payment,
            };

            set({ orders: [...get().orders, newOrder], lastOrderNumber: { ...get().lastOrderNumber, [orderYear]: seq } });
            return newOrder;
        },

        addOrderFromCart: (cartItems, user, payment) => {
            const selectedAddress = user.address?.find(a => a.isSelected);
            if (!selectedAddress) throw new Error("No selected Address")

            return get().addOrder(
                cartItems.map((item) => ({
                    product: item.product,
                    ProductConfig:item.ProductConfig,
                    totalprice: item.totalprice,
                })),
                user,
                selectedAddress,
                payment,
            );
        },

        updateOrderStatus: (id, status) => {
            set({
                orders: get().orders.map((o) =>
                    o.id === id ? { ...o, status } : o
                ),
            });
        },

        updatePaymentStatus: (id, status, transactionId) => {
            set({
                orders: get().orders.map((o) =>
                    o.id === id
                        ? {
                            ...o,
                            payment: {
                                ...o.payment,
                                status,
                                transactionId: transactionId ?? o.payment.transactionId,
                            },
                        }
                        : o
                ),
            });
        },

        removeOrder: (id) => {
            set({
                orders: get().orders.filter((o) => o.id !== id),
            });
        },

        clearOrders: () => set({
            orders: [],
            // lastOrderNumber: {} 
        }),

        getOrder: (id) => get().orders.find((o) => o.id === id),

        getOrders: () => get().orders,

        getOrdersByUser: (userId: string) => {
            return get().orders.filter(o => o.userId === userId)
        },
        getLatestOrder: () => {
            return [...get().orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        },
    })
        , { name: "order-store" }
    )
); 