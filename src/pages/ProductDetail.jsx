import { useParams } from "react-router"
import { fetchProduct } from "../api/productsApi.js"
import useFetch from "../hooks/useFetch.js"
import useCartStore from "../store/cartStore"

function ProductDetail() {
    const params = useParams()
    const id = params.id
    const fetchState = useFetch((signal) => fetchProduct(id, signal), [id])
    const { loading, data: product, error } = fetchState
    const addItem = useCartStore(state => state.addItem)

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    if (error) {
        if (error.status === 404) {
            return (
                <p>Product not found</p>
            )
        }

        return (
            <p>An error has occured {error.message}</p>
        )
    }

    return (
        <>
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <div>
                <img src={product.thumbnail} alt={product.title}></img>
                <p>{product.description}</p>
            </div>
            <button onClick={() => addItem(product)}>Add to cart {product.price}$</button>
        </>
    )
}

export default ProductDetail