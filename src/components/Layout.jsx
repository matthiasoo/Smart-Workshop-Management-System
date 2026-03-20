import { Outlet, Link } from "react-router-dom";
import './Layout.css';

function Layout() {
    return (
        <div className="layout-wrapper">
            <header className="navbar">
                <Link to="/" className="link">
                    <h1>Smart Workshop</h1>
                </Link>
            </header>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;