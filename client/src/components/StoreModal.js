// React
import React from 'react';

// Import Axios calls
// import axiosRequest from '../axios/ManageItems';

// Import Category Order
// import categoryOrder from '../config/category_order';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../App.css';

// FontAwesome
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faTrash} from '@fortawesome/free-solid-svg-icons';

// StoreList componenet
const StoreModal = ({ modalOpen, toggleModal, stores, newStore }) => {

const [storeName, setStoreName] = React.useState('');
const [neighborhood, setNeighborhood] = React.useState('');


const onChange = (evt) => {
    if (evt.target.name === 'store_name') setStoreName(evt.target.value);
    if (evt.target.name === 'neighborhood') setNeighborhood(evt.target.value);
}


const onSubmit = (evt) => {
    evt.preventDefault();

    let okayToSubmit = true;

    for (let store of stores) {
        if (store.store_name + store.neighborhood === storeName + neighborhood) okayToSubmit = false;
    }

    if (okayToSubmit) {
        toggleModal();
        newStore(storeName, neighborhood);
    }
}

    return (
        <Modal show={modalOpen} onHide={toggleModal}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase">Add Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-5" controlId="formStoreInput">
                            <Form.Control
                                type="text"
                                name="store_name"
                                placeholder="Enter Store Name"
                                onChange={onChange}
                                required
                            />
                            <Form.Text className="text-danger">(Required)</Form.Text>
                            <Form.Control
                                type="text"
                                className="mt-4"
                                name="neighborhood"
                                placeholder="Enter Neighborhood"
                                onChange={onChange}
                                required
                            />
                            <Form.Text className="text-danger">(Required)</Form.Text>
                        </Form.Group>
                        <Row>
                            <Button type="submit" variant="primary">Save</Button>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    )
}

export default StoreModal;