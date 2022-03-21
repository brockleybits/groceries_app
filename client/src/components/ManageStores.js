// React
import React from 'react';

// Import Axios calls
import axiosRequest from '../axios/ManageStores';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../App.css';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

// Item Modal
import StoreModal from './StoreModal';

// StoreList componenet
const ManageStores = () => {

    const [stores, setStores] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [alert, setAlert] = React.useState({
        alert: false,
        message: null,
        variant: null
    });

    const toggleModal = () => setModalOpen(!modalOpen);
    
    React.useEffect(() => {
        axiosRequest.getAll()
            .then(result => {
                console.log('Retrieved Stores from dB.');
                setStores(result.data);
                if (localStorage.alert) setAlert(JSON.parse(localStorage.alert));
            })
            .catch(err => (console.log(`Client-side GET Stores Result Error: ${err}`)));
    }, []);

    const insertNewStore = (store_name, neighborhood) => {
        axiosRequest.addStore({
            store_name,
            neighborhood
        })
            .then(() => {
                console.log('Store added to dB.');
                localStorage.setItem('alert', JSON.stringify({
                    alert: true,
                    message: "Store added!",
                    variant: "success"
                }));
                window.location.reload();
            })
            .catch(err => (console.log(`Client-side DELETE Store Error: ${err}`)));
    }

    const deleteStore = id => {
        if (window.confirm('Delete Store? Are you sure? CAUTION: Deleting a store will also delete any items sold exclusively at this store.')) {
            axiosRequest.deleteStore(id)
                .then(() => {
                    console.log('Store removed.');
                    setAlert({
                        alert: true,
                        message: "Store removed!",
                        variant: "warning"
                    });
                    setStores(stores.filter(store => store.id !== id));
                })
                .catch(err => (console.log(`Client-side DELETE Store Error: ${err}`)));
        } 
    }

    React.useEffect(() => {
        if (alert.alert) {
            localStorage.removeItem('alert');
            setTimeout(() => {
                setAlert({
                    alert: false,
                    message: null,
                    variant: null
                });
            }, 2000);
        }
    }, [alert]);

    return (
        <Container>
            {
                alert.alert ?
                    <Alert variant={alert.variant}>{alert.message}</Alert>
                    :
                    null
            }
            <Button variant="primary" size="lg" className="my-4" onClick={toggleModal}>Add Store</Button>
            <StoreModal
                modalOpen={modalOpen}
                toggleModal={toggleModal}
                stores={stores}
                newStore={insertNewStore}
            />
            <ListGroup>
                { stores.map(store => 
                    <ListGroup.Item className="d-flex justify-content-between align-items-start align-items-center" key={`store-info-${store.id}`}>                        
                        <div className="fw-bolder fs-5 text-dark">
                            {store.store_name}
                        </div>
                        <div className="fs-6 text-secondary">
                            {store.neighborhood}
                        </div>
                        <Button variant="outline-danger" size="sm" onClick={() => deleteStore(store.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
}


export default ManageStores;