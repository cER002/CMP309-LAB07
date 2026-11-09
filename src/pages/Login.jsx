import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useLocation, useNavigate } from "react-router"
import authLogin from "../api/authApi.js"

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const from = location.state?.from?.pathname ?? '/'
    const search = location.state?.from?.search ?? ''
    const url = `${from}${search}`

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        try {
            setLoading(true)
            const user = await authLogin(formData.username, formData.password)
            login(user)
            setLoading(false)
            navigate(url, { replace: true })
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            {error && <p>An Error has occured: {error}</p>}
        </>
    )
}

export default Login