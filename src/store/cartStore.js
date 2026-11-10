import { create } from "zustand";

function loadCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("cartItems"))
        if (Array.isArray(cart)) {
            return cart
        }
        return []
    } catch (err) {
        console.error("There was an error while loading the cart: ", err.message)
        return []
    }
}

function saveCart({ items }) {
    try {
        localStorage.setItem("cartItems", JSON.stringify(items))
    } catch (err) {
        console.error("There was an error while saving the cart: ", err.message)
    }
}

const useCartStore = create((set) => ({
    items: loadCart(),
    addItem: (product) => set((state) => {
        if (state.items.some((i) => i.id === product.id)) {
            return { items: state.items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) }
        } else {
            return { items: [...state.items, { id: product.id, title: product.title, price: product.price, quantity: 1 }] }
        }
    }),
    setQuantity: (id, quantity) => set((state) => {
        if (quantity < 1) {
            return { items: state.items.filter((i) => i.id !== id) }
        } else {
            return { items: state.items.map((i) => i.id === id ? { ...i, quantity } : i) }
        }
    }),
    removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    clear: () => set({ items: [] })
}))

useCartStore.subscribe(saveCart)

export default useCartStore