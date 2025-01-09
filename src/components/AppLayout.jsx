import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <>
        <header>
            HEADER
        </header>

        <Outlet/>

        <footer>FOOTER</footer>
        </>
    )
}

export default AppLayout;