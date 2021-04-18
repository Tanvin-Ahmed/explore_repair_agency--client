import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../../img/logo/logo1.png';
import { useContext } from 'react';
import { appContext } from '../../../App';
import { signOut } from '../../Login/LoginManager';

const NavBar = () => {
    const { loggedInUser, setLoggedInUser } = useContext(appContext);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogOut = () => {
        sessionStorage.removeItem('user');
        setLoggedInUser({});
        signOut();
    }

    useEffect(() => {
        fetch(`https://serene-caverns-03356.herokuapp.com/isAdmin/${loggedInUser?.email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data);
            })
            .catch(err => console.log(err));
    }, [isAdmin]);



    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" className="nav-bg" variant="dark">
            <Navbar.Brand><img style={{ background: 'white', width: '3rem' }} src={logo} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto d-flex align-items-center">
                    <Nav.Link><Link className="navLink-text" to="/">HOME</Link></Nav.Link>
                    <Nav.Link><Link className="navLink-text" to="/myOrder">MY ORDER</Link></Nav.Link>
                    {
                        isAdmin && <Nav.Link><Link className="navLink-text" to="/admin">ADMIN</Link></Nav.Link>
                    }
                    <Nav.Link><Link className="navLink-text">ABOUT</Link></Nav.Link>
                    <Nav.Link><Link className="navLink-text">CONTACT US</Link></Nav.Link>
                    <Nav.Link>
                        {
                            loggedInUser?.email ? <button className="btn btn-light" onClick={handleLogOut}>LogOut</button> : <Link className="btn btn-light" to="/login">Login</Link>
                        }
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;