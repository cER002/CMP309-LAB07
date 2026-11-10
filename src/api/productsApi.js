function fetchProducts(signal) {
    return fetch('https://dummyjson.com/products?limit=100', { signal })
        .then(res => {
            if (!res.ok) {
                const err = new Error(`HTTP Error: ${res.status}`)
                err.status = res.status
                throw err
            }
            return res.json()
        })
        .then(
            res => res.products
        )
        .catch(err => {
            err.name === 'AbortError' ? console.error('fetch aborted', err) : console.error('A network error has occured', err)
            throw err
        })
}

function fetchProduct(id, signal) {
    return fetch(`https://dummyjson.com/products/${id}`, { signal })
        .then(res => {
            if (!res.ok) {
                const err = new Error(`HTTP Error: ${res.status}`)
                err.status = res.status
                throw err
            }
            return res.json()
        })
        .catch(err => {
            err.name === 'AbortError' ? console.error('fetch aborted', err) : console.error('A network error has occured', err)
            throw err
        })
}

export { fetchProduct, fetchProducts }