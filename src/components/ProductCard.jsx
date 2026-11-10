function ProductCard({ product }) {
    return (
    <div>
        <img src={product.thumbnail}></img>
        <div>
            <h3>{product.title}</h3>
            <h4>{product.category}</h4>
            <p>{product.description}</p>
            <p>Price: {product.price}$</p>
        </div>
    </div>
    )
}

export default ProductCard