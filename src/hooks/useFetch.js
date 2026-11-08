import { useEffect, useReducer } from "react"

const initialState = {
    loading: true,
    data: [],
    error: null
}

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_START': return { ...state, loading: true, error: null }
        case 'FETCH_SUCCESS': return { ...state, loading: false, data: action.payload }
        case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload }
        default: return state
    }
}

function useFetch(fetchFn, inputs = []) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const controller = new AbortController()

    useEffect(() => {
        dispatch({ type: 'FETCH_START' })
        fetchFn(controller.signal)
            .then((data) => {
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            })
            .catch((err) => {
                err.name !== 'AbortError' && dispatch({ type: 'FETCH_FAIL', error: err })
            })
        return () => controller.abort()
    }, [inputs])

    return state
}

export default useFetch