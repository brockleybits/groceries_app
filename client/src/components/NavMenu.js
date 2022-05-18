// React
import React from 'react';

// Bootstrap and CSS
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStoreAlt} from '@fortawesome/free-solid-svg-icons';

// Import Axios Logout
import axiosRequest from '../axios/UserAuth';


const NavMenu = () => {

    const onClick = () => {
        axiosRequest.logout()
            .then(window.location.pathname = '/')
            .catch(err => console.log(err));
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="max-container-width">
                <Navbar.Brand href="/dashboard" className="px-4 icon-size"><FontAwesomeIcon icon={faStoreAlt}/></Navbar.Brand>
                <Navbar.Toggle className="pe-2" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard" className="mt-2 pe-3 text-uppercase">Where To?</Nav.Link>
                        <Nav.Link href="/shopping-list" className="mt-2 pe-3 text-uppercase">Shopping List</Nav.Link>
                        <Nav.Link href="/manage-stores" className="mt-2 text-uppercase">Manage Stores</Nav.Link>
                        <Button className="my-3 mx-4" onClick={onClick} >Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavMenu;