import { NavLink } from "react-router";
import useCartStore from "../store/cartStore.js";
import { useAuth } from "../context/AuthContext.jsx";

function NavBar() {
    const { user, logout } = useAuth()
    const itemCount = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0))

    return (
        <nav>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav active' : 'nav')}
            >Home</NavLink>
            <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? 'nav active' : 'nav')}
            >Products</NavLink>
            <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? 'nav active' : 'nav')}
            >Cart ({itemCount})</NavLink>
            {!user ? <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'nav active' : 'nav')}>Login</NavLink> :
                <div><p>{user.username}</p> <button onClick={logout}>Logout</button></div>}
        </nav>
    )
}

export default NavBar