// React
import React from 'react';

// Bootstrap and CSS
import Container from 'react-bootstrap/Container';

// Components
import Route from './Route';
import Login from './Login';
import WhereTo from './WhereTo';
import ShoppingList from './ShoppingList';
import ManageStores from './ManageStores';


// Main component
const Main = () => {

    return (
        <Container>
            <Route path="/">
                <Login/>
            </Route>
            <Route path="/dashboard">
                <WhereTo />
            </Route>
            <Route path="/shopping-list">
                <ShoppingList />
            </Route>
            <Route path="/manage-stores">
                <ManageStores />
            </Route>
        </Container>
    );
}

export default Main;