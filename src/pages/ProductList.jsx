import { useSearchParams } from "react-router"
import useFetch from "../hooks/useFetch.js"
import { fetchProducts } from "../api/productsApi.js"
import ProductCard from "../components/ProductCard.jsx"

function ProductList() {
    const fetchState = useFetch(fetchProducts, [])
    const [searchParams, setSearchParams] = useSearchParams()
    const { loading, data, error } = fetchState

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    if (error) {
        return (
            <p>An error has occured {error.message}</p>
        )
    }

    const products = data ?? []
    const category = searchParams.get('category') ?? ''
    const categories = Array.from(new Set(products.map((p) => p.category)))
    const query = searchParams.get('q') ?? ''
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) && (category === '' || p.category === category))

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={(e) => setSearchParams(prev => {
                    const params = new URLSearchParams(prev)
                    if (e.target.value) {
                        params.set('q', e.target.value)
                    } else {
                        params.delete('q')
                    }
                    return params
                })}
            />
            <select
                value={category}
                onChange={(e) => setSearchParams(prev => {
                    const params = new URLSearchParams(prev)
                    if (e.target.value) {
                        params.set('category', e.target.value)
                    } else {
                        params.delete('category')
                    }
                    return params
                })}>
                <option value=''>All</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div>
                {filteredProducts.length ? filteredProducts.map((p) => <ProductCard key={p.id} product={p} />) : <p>No matching products</p>}
            </div>
        </>
    )
}

export default ProductList