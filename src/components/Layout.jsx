import { Outlet } from "react-router"
import NavBar from "./NavBar.jsx"
import useLocalStorage from "../hooks/useLocalStorage.js"

function Layout() {
    const [theme, setTheme] = useLocalStorage('theme', 'light')

    return (
        <div className={theme}>
            <NavBar theme={theme} toggleTheme={() => setTheme((prev) => prev === 'light' ? 'dark' : 'light')}/>
            <main><Outlet /></main>
            <footer>footer</footer>
        </div>
    )
}

export default Layout