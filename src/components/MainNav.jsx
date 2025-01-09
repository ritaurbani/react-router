import { NavLink } from "react-router-dom"

function MainNav() {

const  navigation = [
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
        //per ogni rotta creiamo un link
        <nav>
            <ul>
                {navigation.map((nav) => (
                    <li key={nav.title}>
                        <NavLink to={nav.path}>{nav.title}</NavLink>
                    </li>
                ))}
                {/* <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/contacts">Contacts</NavLink>
                </li> */}
            </ul>
        </nav>
    )
}

export default MainNav;