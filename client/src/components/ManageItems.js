// React
import React from 'react';

// Import Axios calls
import axiosRequest from '../axios/ManageItems';

// Import Add/Remove
import { addRemove } from '../compute/add_remove';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../App.css';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

// Item Modal
import ItemModal from './ItemModal';

// StoreList componenet
const ManageItems = () => {

    const [verified, setVerified] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [itemList, setItemList] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [firstCategoryId, setFirstCategoryId] = React.useState('');
    const [stores, setStores] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState({
        id: null,
        item_name: null,
        category_id: null,
        store_id: []
    });
    const [alert, setAlert] = React.useState({
        alert: false,
        message: null,
        variant: null
    });

    const toggleModal = () => setModalOpen(!modalOpen);
    
    React.useEffect(() => {
        axiosRequest.getAll()
            .then(res => {
                console.log('Retrieved Items, Categories, and Stores from dB.')
                let result = res.data;
                setVerified(true);
                setItems(result[0]);
                setCategories(result[1]);
                setFirstCategoryId(result[1][0].id);
                setStores(result[2]);
                if (localStorage.alert) setAlert(JSON.parse(localStorage.alert));
            })
            .catch(err => {
                console.log(err);
                window.location.pathname = '/';
            });
        }, []);

    React.useEffect(() => setItemList(items), [items]);

    const deleteItem = id => {
        if (window.confirm('Delete Item?')) {
            axiosRequest.deleteItem(id)
                .then(() => {
                    console.log('Item deleted.');
                    setAlert({
                        alert: true,
                        message: "Item deleted!",
                        variant: "warning"
                    });
                    setItems(items.filter(item => item.id !== id));
                    document.getElementById('item-search').value = '';
                })
                .catch(err => (console.log(`Client-side DELETE Item Error: ${err}`)));
        } 
    }

    const insertNewItem = (name, category_id, store_id) => {
        axiosRequest.addItem({
            name,
            category_id,
            store_id,
        })
            .then((result) => {
                console.log(`Item ID ${result.data[0]} added to store(s).`)
                localStorage.setItem('alert', JSON.stringify({
                    alert: true,
                    message: "Item added!",
                    variant: "success"
                }));
                window.location.reload();
            })
            .catch(err => (console.log(`Client-side INSERT Item Error: ${err}`)));
    }

    const onChange = (evt) => {
        let regex = new RegExp(evt.target.value, 'gi');
        setItemList(items.filter(item => item.item_name.match(regex)));
    }

    const enterEditMode = (id) => {
        axiosRequest.getItem(id)
            .then((result) => {
                let data = result.data;
                let storeArray = [];
                for (let id of data[1]) {
                    storeArray.push(id.store_id);
                }
                setEditMode({
                    ...editMode,
                    id: data[0][0].id,
                    item_name: data[0][0].item_name,
                    category_id: data[0][0].category_id,
                    store_id: storeArray
                });
                toggleModal();
            })
            .catch(err => console.log(`Client-side GET ITEM error: ${err}`));
    }

    const editItem = (name, category_id, store_id) => {
        let [addStore, removeStore] = addRemove(editMode.store_id, store_id); 
        axiosRequest.editItem({
            id: editMode.id,
            name,
            category_id,
            store_id,
            addStore,
            removeStore
        })
            .then(() => {
                console.log(`Item ID: ${editMode.id} updated.`);
                setEditMode ({
                    id: null,
                    item_name: null,
                    category_id: null,
                    store_id: []
                });
            })
            .catch(err => console.log(`Client-side UPDATE ITEM error: ${err}`));
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
        <Container className="max-container-width">
            {
                alert.alert &&
                <Alert variant={alert.variant}>{alert.message}</Alert>
            }
            {
                verified && 
                <div>
                    <Button variant="primary" size="lg" className="mt-4 mb-3" onClick={toggleModal}>Add Item</Button>
                    <Form.Control
                        type="text"
                        className="mb-3"
                        id="item-search"
                        name="search"
                        placeholder="Search"
                        onChange={onChange}
                    />
                </div>
            }
            <ItemModal
                modalOpen={modalOpen}
                toggleModal={toggleModal}
                categories={categories}
                stores={stores}
                newItem={insertNewItem}
                editMode={editMode}
                editItem={editItem}
                firstCategoryId={firstCategoryId}
            />
            <ListGroup>
                { itemList.map(item => 
                    <ListGroup.Item key={item.id}>
                        <div className="d-flex align-items-center">
                            <div className="me-auto">{item.item_name}</div>
                            <div>
                                <Button
                                    className="me-2"
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => enterEditMode(item.id)}>
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteItem(item.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
}

export default ManageItems;