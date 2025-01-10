import { NavLink } from "react-router-dom"

function Navbar() {

    //ogni link e`un oggetto
    const navigation = [
        {
            path: "/",
            title: "Home"
        },
        {
            path: "/posts",
            title: "Posts"
        },
        {
            path: "/about",
            title: "About"
        },
    ]

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navigation.map((nav) => (
                            <li key={nav.title}>
                                <NavLink className="nav-link" aria-current="page" to={nav.path}>{nav.title}</NavLink>
                            </li>
                        ))}
                       
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar