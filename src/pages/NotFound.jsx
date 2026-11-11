import { Link } from "react-router"

function NotFound() {
    return (
        <>
            <p>Can't find what you are looking for</p>
            <Link to='/'>Back to home</Link>
        </>
    )
}

export default NotFound