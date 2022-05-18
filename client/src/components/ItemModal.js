// React
import React from 'react';

// Bootstrap and CSS
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


// StoreList componenet
const ItemModal = ({ modalOpen, toggleModal, categories, stores, addItem, editMode, editItem, firstCategoryId }) => {

const [itemName, setItemName] = React.useState('');
const [categoryId, setCategoryId] = React.useState(null);
const [storesChecked, setStoresChecked] = React.useState({});
const [modalTitle, setModalTitle] = React.useState('Add Item');
const [alert, setAlert] = React.useState({
    alert: false,
    message: null,
    variant: null
});


React.useEffect(() => {
    let storeIdObj = {};
    for (let store of stores) {
        storeIdObj[store.id] = false;
    }
    if (!!editMode.store_id.length) {
        for (let id of editMode.store_id) {
            storeIdObj[id] = true;
        }
        setCategoryId(editMode.category_id);
        setItemName(editMode.item_name);
        setModalTitle('Edit Item');
    }

    setStoresChecked(storeIdObj);
}, [stores, editMode]);


const onChange = (evt) => {
    if (evt.target.name === 'category') setCategoryId(evt.target.value);
    if (evt.target.name === 'item_name') setItemName(evt.target.value);
}


const updateStoresChecked = (evt) => {
    let tempObj = storesChecked;
    tempObj[evt.target.value] = evt.target.checked;
    setStoresChecked(tempObj);
}

const onSubmit = (evt) => {
    evt.preventDefault();
    let storeIds = [];
    for (let id of Object.keys(storesChecked)) {
        if (storesChecked[id]) storeIds.push(id)
    }
    if (!!storeIds.length) {

        if (editMode.id) {
            editItem(itemName.trim(), categoryId, storeIds);
        } else {
            let catId = categoryId;
            if (!catId) catId = firstCategoryId;
            addItem(itemName.trim(), catId, storeIds);
        }

        closeModal();
    } else {
        setAlert({
            alert: true,
            message: "Store required!",
            variant: "danger"
        });
    }
}

const closeModal = () => {
    setItemName('');
    setCategoryId(null);
    setStoresChecked({});
    setModalTitle('Add Item');
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
                {
                    alert.alert ?
                        <Alert variant={alert.variant}>{alert.message}</Alert>
                        :
                        null
                }
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase">{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-5" controlId="formItemInput">
                            <Form.Control
                                type="text"
                                name="item_name"
                                placeholder="Enter Item Name"
                                defaultValue={editMode.item_name}
                                onChange={onChange}
                                required
                            />
                            <Form.Text className="text-danger">(Required)</Form.Text>
                            <Form.Select 
                                className="mt-4"
                                aria-label="Category Selection"
                                name="category"
                                defaultValue={editMode.category_id}
                                onChange={onChange}
                                required
                                >{
                                    categories.map(category => 
                                        <option
                                            key={`category-${category.id}`}
                                            value={category.id}
                                            name="category"
                                        >
                                            {category.category_name}
                                        </option>)
                                }
                            </Form.Select>
                            <Form.Text className="text-danger">(Required)</Form.Text>
                            <Container className="mt-4">
                                <span className="pe-3 fs-3">Available at:</span>
                                <Form.Text className="text-danger">(Required)</Form.Text>
                                {
                                    stores.map((store,index) =>
                                        <FormCheck className="d-flex align-items-center my-3" key={index}>
                                            <FormCheck.Label
                                                className="checkbox-container"
                                                htmlFor={`Store-${store.id}`}
                                            >
                                                <p>                                                    
                                                    <span className="modal-store-name">{store.store_name}</span>
                                                    <span className="modal-store-neighborhood">{store.neighborhood}</span>
                                                </p>
                                                <FormCheck.Input
                                                    type="checkbox"
                                                    id={`Store-${store.id}`}
                                                    value={store.id}
                                                    defaultChecked={storesChecked[store.id]}
                                                    onChange={updateStoresChecked}
                                                />
                                                <span className="checkmark"></span>
                                            </FormCheck.Label>
                                        </FormCheck>
                                        )
                                }
                            </Container>
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

export default ItemModal;
