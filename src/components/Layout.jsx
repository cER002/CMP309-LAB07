import { Outlet } from "react-router"
import NavBar from "./NavBar"

function Layout() {
    return (
        <>
            <NavBar />
            <main><Outlet /></main>
            <footer>footer</footer>
        </>
    )
}

export default Layout