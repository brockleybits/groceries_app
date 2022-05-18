// React
import React from 'react';

// Bootstrap and CSS
import Container from 'react-bootstrap/Container';

// Components
import Route from './Route';
import Login from './Login';
import CurrentList from './CurrentList';
import UpdateList from './UpdateList';
import ManageStores from './ManageStores';


// Main component
const Main = () => {

    return (
        <Container>
            <Route path="/">
                <Login/>
            </Route>
            <Route path="/dashboard">
                <CurrentList />
            </Route>
            <Route path="/shopping-list">
                <UpdateList />
            </Route>
            <Route path="/manage-stores">
                <ManageStores />
            </Route>
        </Container>
    );
}

export default Main;