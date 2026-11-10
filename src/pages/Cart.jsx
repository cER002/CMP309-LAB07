import { Link } from "react-router"
import useCartStore from "../store/cartStore.js"

function Cart() {
    const items = useCartStore(state => state.items)
    const setQuantity = useCartStore(state => state.setQuantity)
    const removeItem = useCartStore(state => state.removeItem)
    const clear = useCartStore(state => state.clear)
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)


    if (items.length === 0) {
        return (
            <>
                <p>Your cart is empty</p>
                <Link to='/products'>Go back to products</Link>
            </>
        )
    }

    return (
        <>
            {items.map((p) => {
                return (<div key={p.id}>
                    <h3>{p.title}</h3>
                    <div>
                        <p>{p.quantity}</p>
                        <p>{p.quantity * p.price}$</p>
                        <button onClick={() => setQuantity(p.id, p.quantity + 1)}>+1</button>
                        <button onClick={() => setQuantity(p.id, p.quantity - 1)}>-1</button>
                        <button onClick={() => removeItem(p.id)}>remove product</button>
                    </div>
                </div>)
            })}
            <p>total: {total}$</p>
            <button onClick={() => clear()}>clear cart</button>
        </>
    )
}

export default Cart