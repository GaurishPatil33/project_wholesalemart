import { create } from "zustand";
// import { CartStore } from "../types";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../types";


export interface CartStore {
    cart: CartItem[];
    // addToCart: (item: CartItem) => void;
    // addToCart: (product: Product, varient?: ProductVariant, quantity?: number) => void;
    addToCart: (product: Product, config: CartItem["ProductConfig"]) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    isInCart: (id: number) => boolean;

    toggleSelect: (id: number) => void;
    toggleSelectAll: (selectAll: boolean) => void;
    removeSelected: () => void
    moveSelectedToWishlist: () => void

    cartTotal: () => number;
    cartItemsCount: () => number;
    selectedCartTotal: () => number;
    selectedCartItems: () => CartItem[];


    wishlist: Product[]
    addToWishlist: (item: Product) => void;
    toggleWishlist: (item: Product) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;


    buyNow: (product: Product, config: CartItem["ProductConfig"]) => void
}

const calculatePrice = (product: Product, quantity: number, basePrice: number) => {
    const moq = [
        { qty: 1, discount: product?.discount ?? 0 },
        { qty: 5, discount: (product?.discount ?? 0) + 5 },
        { qty: 10, discount: (product?.discount ?? 0) + 10 },
        { qty: 25, discount: (product?.discount ?? 0) + 15 },
        { qty: 100, discount: (product?.discount ?? 0) + 20 },
    ];
    const tier = [...moq].reverse().find(t => quantity >= t.qty);
    const discount = tier?.discount ?? product?.discount ?? 0;

    const finalPrice = Math.round(basePrice - (basePrice * discount) / 100);
    const totalPrice = finalPrice * quantity;

    return { discount, finalPrice, totalPrice };
};



export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            wishlist: [],

            addToCart: (product, config) => {
                const basePrice = config.price ?? product.price ?? 0;
                const existing = get().cart.find(item => item.product.id === product.id);

                if (existing) {
                    const newQty = existing.ProductConfig.quantity + config.quantity;
                    const { discount, finalPrice, totalPrice } = calculatePrice(product, newQty, basePrice);

                    set({
                        cart: get().cart.map(item =>
                            item.product.id === product.id
                                ? {
                                    ...item,
                                    ProductConfig: { ...item.ProductConfig, quantity: newQty },
                                    basePrice,
                                    finalPrice,
                                    discount,
                                    totalprice: totalPrice, // ✅ full recalculation
                                }
                                : item
                        )
                    });
                } else {
                    const { discount, finalPrice, totalPrice } = calculatePrice(product, config.quantity, basePrice);

                    set({
                        cart: [
                            ...get().cart,
                            {
                                product,
                                basePrice,
                                finalPrice,
                                discount,
                                totalprice: totalPrice,
                                ProductConfig: { ...config, price: basePrice },
                                attributes: [],
                                sku: "",
                                selected: true,
                            },
                        ]
                    });
                }
            },



            removeFromCart: (id) => {
                set({
                    cart: get().cart.filter(i => i.product.id !== id)
                })
            },

            updateQuantity: (id, quantity) => {
                set({
                    cart: get().cart.map(i => {
                        if (i.product.id !== id) return i;
                        const basePrice = i.basePrice ?? i.product.price ?? 0;
                        const { discount, finalPrice, totalPrice } = calculatePrice(i.product, quantity, basePrice);

                        return {
                            ...i,
                            ProductConfig: { ...i.ProductConfig, quantity },
                            discount,
                            finalPrice,
                            totalprice: totalPrice,
                        };
                    })
                });
            },


            toggleSelect: (id) => {
                set({
                    cart: get().cart.map(i => i.product.id === id ? { ...i, selected: !i.selected } : i)
                })
            },

            toggleSelectAll: (selectAll: boolean) => {
                set({
                    cart: get().cart.map(i => ({ ...i, selected: selectAll }))
                })
            },

            removeSelected: () => {
                set({
                    cart: get().cart.filter(i => !i.selected)
                });
            },


            moveSelectedToWishlist: () => {
                const selectedItems = get().selectedCartItems(); // ✅ call via get()

                if (selectedItems.length === 0) return; // nothing selected

                // Copy current wishlist
                const newWishlist = [...get().wishlist];

                // Add selected products (avoid duplicates)
                selectedItems.forEach(item => {
                    if (!newWishlist.find(w => w.id === item.product.id)) {
                        newWishlist.push(item.product);
                    }
                });

                // Remove them from cart
                set({
                    wishlist: newWishlist,
                    cart: get().cart.filter(i => !i.selected),
                });
            },


            clearCart: () => {
                set({
                    cart: []
                })
            },

            cartTotal: () => get().cart.reduce((total, item) => total + item.totalprice, 0),

            cartItemsCount: () => get().cart.reduce((total, item) => total + item.ProductConfig.quantity, 0),

            selectedCartItems: () => get().cart.filter(i => i.selected),

            selectedCartTotal: () =>
                get().cart.filter(i => i.selected).reduce((total, item) => total + item.totalprice, 0),

            addToWishlist: (item) => {
                if (!get().wishlist.find(i => i.id === item.id)) {
                    set({ wishlist: [...get().wishlist, item] })
                }
            },

            removeFromWishlist: (id) => {
                set({
                    wishlist: get().wishlist.filter(i => i.id !== id)
                })
            },

            toggleWishlist: (item) => {
                const exists = get().wishlist.find(i => i.id === item.id);
                if (exists) {
                    set({ wishlist: get().wishlist.filter(i => i.id !== item.id) });
                } else {
                    set({ wishlist: [...get().wishlist, item] });
                }
            },

            isInWishlist: (id) => {
                return !!get().wishlist.find(i => i.id === id)
            },

            isInCart: (id) => {
                return !!get().cart.find(i => i.product.id === id)

            },
            buyNow: (product, config) => {
                const basePrice = config.price ?? product.price ?? 0;
                const { discount, finalPrice, totalPrice } = calculatePrice(product, config.quantity, basePrice);

                set({
                    cart: [
                        ...get().cart.map(item => ({ ...item, selected: false })), // deselect others
                        {
                            product,
                            basePrice,
                            finalPrice,
                            discount,
                            totalprice: totalPrice,
                            ProductConfig: { ...config, price: basePrice },
                            attributes: [],
                            sku: "",
                            selected: true,
                        },
                    ]
                });
            }



        }),
        { name: "cart-store2", }
    )
);