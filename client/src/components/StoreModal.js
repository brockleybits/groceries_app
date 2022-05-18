// React
import React from 'react';

// Bootstrap and CSS
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


// StoreList componenet
const StoreModal = ({ modalOpen, toggleModal, stores, newStore, editMode, editStore }) => {

const [storeName, setStoreName] = React.useState('');
const [neighborhood, setNeighborhood] = React.useState('');
const [modalTitle, setModalTitle] = React.useState('Add Store');
const [alert, setAlert] = React.useState({
    alert: false,
    message: null,
    variant: null
});


React.useEffect(() => {
    if (editMode.store_id) {
        setStoreName(editMode.store_name);
        setNeighborhood(editMode.neighborhood);
        setModalTitle('Edit Store');
    }
}, [editMode]);


const onChange = (evt) => {
    if (evt.target.name === 'store_name') setStoreName(evt.target.value);
    if (evt.target.name === 'neighborhood') setNeighborhood(evt.target.value);
}


const onSubmit = (evt) => {
    evt.preventDefault();
    
    if (editMode.store_id) {
        editStore(storeName.trim(), neighborhood.trim());
        closeModal();
    } else {
        let okayToSubmit = true;
        for (let store of stores) {
            if (store.store_name + store.neighborhood === storeName.trim() + neighborhood.trim()) {
                okayToSubmit = false;
                setAlert({
                    alert: true,
                    message: "Store already exists.",
                    variant: "danger"
                });
            }
        }
        if (okayToSubmit) {
            newStore(storeName.trim(), neighborhood.trim());
            closeModal();
        }
    }
}


const closeModal = () => {
    setStoreName('');
    setNeighborhood('');
    setModalTitle('Add Store');
    toggleModal();
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
        <Modal show={modalOpen} onHide={closeModal}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase">{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-5" controlId="formStoreInput">
                            <Form.Control
                                type="text"
                                name="store_name"
                                placeholder="Enter Store Name"
                                defaultValue={editMode.store_name}
                                onChange={onChange}
                                required
                            />
                            <Form.Text className="text-danger">(Required)</Form.Text>
                            <Form.Control
                                type="text"
                                className="mt-4"
                                name="neighborhood"
                                placeholder="Enter Neighborhood"
                                defaultValue={editMode.neighborhood}
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