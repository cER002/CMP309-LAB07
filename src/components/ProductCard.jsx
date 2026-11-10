import { Link } from "react-router"

function ProductCard({ product }) {
    return (
        <div>
            <img src={product.thumbnail}></img>
            <div>
                <Link to={`/products/${product.id}`}>
                    <h3>{product.title}</h3>
                </Link>
                <h4>{product.category}</h4>
                <p>{product.description}</p>
                <p>Price: {product.price}$</p>
            </div>
        </div>
    )
}

export default ProductCard