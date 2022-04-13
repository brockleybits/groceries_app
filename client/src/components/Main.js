// React
import React from 'react';

// Axios
import axiosRequest from '../axios/ManageItems';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import '../App.css';

// Components
import Route from './Route';
import Login from './Login';
import CurrentList from './CurrentList';
import UpdateList from './UpdateList';
import ManageItems from './ManageItems';
import ManageStores from './ManageStores';


// Main component
const Main = () => {

    const [storeItemIds, setStoreItemIds] = React.useState([]);
    const [deselectComplete, setDeselectComplete] = React.useState(false);


    React.useEffect(() => {
        if (localStorage.unselectedItemIds) {
            setStoreItemIds(JSON.parse(localStorage.unselectedItemIds));
        } else {
            setDeselectComplete(true);
        }
    }, []);


    React.useEffect(() => {
        console.log(`localStorage after initial useEffect in Main: ${storeItemIds}`);
        if (!!storeItemIds.length) {
            console.log(`Deselecting Item IDs from dB: ${storeItemIds}`);
            axiosRequest.deselectItems(storeItemIds)
                .then(() => {
                    console.log(`Items deselected.`);
                    localStorage.removeItem('unselectedItemIds');
                    setDeselectComplete(true);
                })
                .catch(err => (console.log(`Client-side Result Error: ${err}`)));
        } else {
            setDeselectComplete(true);
        }
    }, [storeItemIds])

    const toggleDeselectComplete = () => setDeselectComplete(false);


    return (
        <Container>
            <Route path="/">
                <Login/>
            </Route>
            <Route path="/dashboard">
                <CurrentList 
                    deselectComplete={deselectComplete}
                    toggleDeselect={toggleDeselectComplete}
                />
            </Route>
            <Route path="/shopping-list">
                <UpdateList
                    deselectComplete={deselectComplete}
                    toggleDeselect={toggleDeselectComplete}
                />
            </Route>
            <Route path="/manage-items">
                <ManageItems />
            </Route>
            <Route path="/manage-stores">
                <ManageStores />
            </Route>
        </Container>
    );
}

export default Main;