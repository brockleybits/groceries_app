// React
import React from 'react';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

const NavMenu = () => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/" className="pe-3"><FontAwesomeIcon icon={faShoppingCart}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/new-list" className="pe-3 text-uppercase">Shopping List</Nav.Link>
                    <Nav.Link href="/items" className="pe-3 text-uppercase">Manage Items</Nav.Link>
                    <Nav.Link href="/stores" className="text-uppercase">Manage Stores</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);


export default NavMenu;