// React
import React from 'react';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import '../App.css';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

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
                <Navbar.Brand href="/dashboard" className="px-4 icon-size"><FontAwesomeIcon icon={faShoppingCart}/></Navbar.Brand>
                <Navbar.Toggle className="pe-2" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/update-list" className="mt-2 pe-3 text-uppercase">Shopping List</Nav.Link>
                        <Nav.Link href="/items" className="mt-2 pe-3 text-uppercase">Manage Items</Nav.Link>
                        <Nav.Link href="/stores" className="mt-2 text-uppercase">Manage Stores</Nav.Link>
                        <Button className="my-3 mx-4" onClick={onClick} >Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavMenu;