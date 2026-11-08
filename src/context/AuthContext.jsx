import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext(null)


function useAuth() {
    const auth = useContext(AuthContext)

    if (!auth) {
        throw new Error("Authentication context cannot be used outside the provider range!")
    }

    return auth
}

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGGED_IN': return { user: action.user }
        case 'LOGGED_OUT': return { user: null }
        default: return state
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, { user: null })
    const login = (user) => dispatch({ type: 'LOGGED_IN', user })
    const logout = () => dispatch({ type: 'LOGGED_OUT' })

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }