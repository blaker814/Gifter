import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { NavbarText } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Header = () => {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const history = useHistory();

    const logoutUser = e => {
        e.preventDefault();
        logout().then(() => history.push("/login"));
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-info">
            <Link to="/" className="navbar-brand">
                GiFTER
            </Link>
            {isLoggedIn ?
                <>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Feed
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/posts/add" className="nav-link">
                                New Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" onClick={logoutUser} className="nav-link">
                                Logout
                            </Link>
                        </li>
                    </ul>
                    <NavbarText>
                        Welcome {user.name}
                    </NavbarText>
                </>
                :
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">
                            Register
                        </Link>
                    </li>
                </ul>
            }
        </nav>
    );
};

export default Header;