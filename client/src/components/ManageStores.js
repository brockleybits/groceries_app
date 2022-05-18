// React
import React from 'react';

// Import Axios calls
import axiosRequest from '../axios/ManageStores';

// Bootstrap and CSS
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

// Item Modal
import StoreModal from './StoreModal';
import AlertModal from './AlertModal';

// StoreList componenet
const ManageStores = () => {

    const [stores, setStores] = React.useState([]);
    const [storeModalOpen, setStoreModalOpen] = React.useState(false);
    const [alertModalOpen, setAlertModalOpen] = React.useState(false);
    const [deleteStoreId, setDeleteStoreId] = React.useState(null);
    const [editMode, setEditMode] = React.useState({
        store_id: null,
        store_name: null,
        neighborhood: null
    });
    const [alert, setAlert] = React.useState({
        alert: false,
        message: null,
        variant: null
    });


    const toggleStoreModal = () => {
        if (storeModalOpen && editMode.id !== null) {
            setEditMode({
                store_id: null,
                store_name: null,
                neighborhood: null
            });
        }
        setStoreModalOpen(!storeModalOpen);
    };

    const toggleAlertModal = (id) => {
        setDeleteStoreId(id);
        setAlertModalOpen(!alertModalOpen);
    }
    

    React.useEffect(() => {
        axiosRequest.getAll()
            .then(result => setStores(result.data))
            .catch(err => {
                console.log(err);
                window.location.pathname = '/';
            });
    }, []);


    const addNewStore = (store_name, neighborhood) => {
        axiosRequest.addStore({
                store_name,
                neighborhood
            })
            .then(result => {
                setAlert({
                    alert: true,
                    message: "Store added!",
                    variant: "success"
                });
                setStores(result.data)
            })
            .catch(() => setAlert({
                alert: true,
                message: "Network Error",
                variant: "danger"
            }));
    }


    const deleteStore = () => {
        setAlertModalOpen(!alertModalOpen);
        axiosRequest.deleteStore(deleteStoreId)
            .then(result => {
                setAlert({
                    alert: true,
                    message: "Store removed!",
                    variant: "warning"
                });
                setStores(result.data);
            })
            .catch(() => setAlert({
                alert: true,
                message: "Network Error",
                variant: "danger"
            }));
    }


    const enterEditMode = (id) => {
        axiosRequest.getStore(id)
            .then(result => {
                setEditMode({
                    ...editMode,
                    store_id: result.data[0].id,
                    store_name: result.data[0].store_name,
                    neighborhood: result.data[0].neighborhood
                });
                toggleStoreModal();
            })
            .catch(() => setAlert({
                alert: true,
                message: "Network Error",
                variant: "danger"
            }));
    }


    const editStore = (store_name, neighborhood) => {
        axiosRequest.editStore({
                store_id: editMode.store_id,
                store_name,
                neighborhood
            })
            .then(result => {
                setEditMode ({
                    store_id: null,
                    store_name: null,
                    neighborhood: null
                });
                setAlert({
                    alert: true,
                    message: "Store updated!",
                    variant: "success"
                });
                setStores(result.data);
            })
            .catch(() => setAlert({
                alert: true,
                message: "Network Error",
                variant: "danger"
            }));
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
        <Container className="py-4 max-container-width">
            {
                alert.alert &&
                <Alert variant={alert.variant}>{alert.message}</Alert>
            }
            <Button variant="primary" size="lg" className="mb-4" onClick={toggleStoreModal}>Add Store</Button>
            <StoreModal
                modalOpen={storeModalOpen}
                toggleModal={toggleStoreModal}
                stores={stores}
                newStore={addNewStore}
                editMode={editMode}
                editStore={editStore}
            />
            <AlertModal
                modalOpen={alertModalOpen}
                toggleModal={toggleAlertModal}
                alertInfo={{
                    title: 'Delete Store?',
                    body: 'WARNING: Deleting this store will also delete all items sold exclusively at this store. Are you sure you want to delete?',
                    button: 'Delete',
                    variant: 'danger'
                }}
                modalAction={deleteStore}
            />
            <ListGroup>
                { stores.map(store => 
                    <ListGroup.Item className="d-flex justify-content-between align-items-start align-items-center py-3" key={`store-info-${store.id}`}>                        
                        <div>
                            <span className="store-font">
                                {store.store_name}
                            </span>
                            <span className="neighborhood-font text-secondary ps-2">
                                {store.neighborhood}
                            </span>
                        </div>
                        <div>
                            <Button
                                className="item-button"
                                variant="outline-dark"
                                size="sm"
                                onClick={() => enterEditMode(store.id)}
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                            </Button>
                            <Button
                                className="item-button"
                                variant="outline-danger"
                                size="sm"
                                onClick={() => toggleAlertModal(store.id)}
                                disabled={stores.length === 1 ? true : false}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
}


export default ManageStores;