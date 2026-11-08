async function fetchProducts(signal) {
    return fetch('https://dummyjson.com/products?limit=100', { signal })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }
            return res.json()
        })
        .catch(err => {
            err.name === 'AbortError' ? console.error('fetch aborted', err) : console.error('A network error has occured', err)
            throw err
        })
}

async function fetchProduct(id, signal) {
    return fetch(`https://dummyjson.com/products/${id}`, { signal })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }
            return res.json()
        })
        .catch(err => {
            err.name === 'AbortError' ? console.error('fetch aborted', err) : console.error('A network error has occured', err)
            throw err
        })
}

export { fetchProduct, fetchProducts }