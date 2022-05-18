// React
import React from 'react';

// Import Axios calls and Category display order
import axiosRequest from '../axios/UpdateList';

// Import Add/Remove
import { addRemove } from '../compute/add_remove';

// React-Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

// Item Modal
import ItemModal from './ItemModal';
import AlertModal from './AlertModal';


// StoreList componenet
const UpdateList = () => {

    const [categoryInfo, setCategoryInfo] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [firstCategoryId, setFirstCategoryId] = React.useState('');
    const [stores, setStores] = React.useState([]);
    const [searchString, setSearchString] = React.useState('');
    const [itemModalOpen, setItemModalOpen] = React.useState(false);
    const [alertModalOpen, setAlertModalOpen] = React.useState(false);
    const [deleteItemId, setDeleteItemId] = React.useState(null);
    // const [noInfo, setNoInfo] = React.useState(false);
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


    React.useEffect(() => {
        axiosRequest.getAll()
        .then(result => {
            let info = result.data;
            setCategoryInfo(info[0]);
            setCategories(info[1]);
            setFirstCategoryId(info[1][0].id);
            setStores(info[2]);
        })
        .catch(err => {
            console.log(err);
            window.location.pathname = '/';
        });
    }, []);


    const updateSelection = ((item_id,checked) => {
        axiosRequest.updateItemSelection({
            item_id,
            value: checked ? 1 : 0
        })
        .then(() => searchItems(searchString))
        .catch(() => setAlert({
            alert: true,
            message: "Network Error",
            variant: "danger"
        }));

    });


    const searchPattern = (evt) => {
        setSearchString(evt.target.value);
        searchItems(evt.target.value);
    }


    const clearSearch = () => {
        document.getElementById('item-search').value = '';
        setSearchString('');
        searchItems('');
    }


    const searchItems = (pattern) => {
        axiosRequest.searchItems({pattern})
        .then(result => setCategoryInfo(result.data))
        .catch(() => setAlert({
            alert: true,
            message: "Network Error",
            variant: "danger"
        }));
    }


    const toggleItemModal = () => {
        if (itemModalOpen && editMode.id !== null) {
            setEditMode({
                id: null,
                item_name: null,
                category_id: null,
                store_id: []
            });
        }
        setItemModalOpen(!itemModalOpen);
    };


    const toggleAlertModal = (id) => {
        setAlertModalOpen(!alertModalOpen);
        setDeleteItemId(id);
    }


    const deleteItem = () => {
        setAlertModalOpen(!alertModalOpen);
        axiosRequest.deleteItem(deleteItemId)
            .then(() => {
                setAlert({
                    alert: true,
                    message: "Item deleted!",
                    variant: "warning"
                });
                setDeleteItemId(null);
                clearSearch();
            })
            .catch(() => setAlert({
                alert: true,
                message: "Network Error",
                variant: "danger"
            }));
    }


    const addItem = (name, category_id, store_id) => {
        axiosRequest.addItem({
            name,
            category_id,
            store_id,
        })
        .then(() => {
            setAlert({
                alert: true,
                message: "Item added!",
                variant: "success"
            });
            clearSearch();
        })
        .catch(() => setAlert({
            alert: true,
            message: "Network Error",
            variant: "danger"
        }));
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
                toggleItemModal();
            })
            .catch(() => setAlert({
                alert: true,
                message: "Network Error",
                variant: "danger"
            }));
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
                setEditMode ({
                    id: null,
                    item_name: null,
                    category_id: null,
                    store_id: []
                });
                setAlert({
                    alert: true,
                    message: "Item updated!",
                    variant: "success"
                });
                searchItems(searchString);
            })
            .catch(() => setAlert({
                alert: true,
                message: "Network Error",
                variant: "danger"
            }));
    }


    React.useEffect(() => {
        if (alert.alert) {
            setTimeout(() => {
                setAlert({
                    alert: false,
                    message: null,
                    variant: null
                });
            }, 1500);
        }
    }, [alert]);


    return (
        <Container className="py-4 max-container-width">
            {
                alert.alert &&
                <Alert variant={alert.variant}>{alert.message}</Alert>
            }
            <h1 hidden>Shopping List</h1>
            <ItemModal
                modalOpen={itemModalOpen}
                toggleModal={toggleItemModal}
                categories={categories}
                stores={stores}
                addItem={addItem}
                editMode={editMode}
                editItem={editItem}
                firstCategoryId={firstCategoryId}
            />
            <AlertModal
                modalOpen={alertModalOpen}
                toggleModal={toggleAlertModal}
                alertInfo={{
                    title: 'Delete Item?',
                    body: 'Deleting this item will remove it from your shopping list and from all stores. Are you sure you want to delete?',
                    button: 'Delete',
                    variant: 'danger'
                }}
                modalAction={deleteItem}
            />
            <Button variant="primary" size="lg" className="mb-3" onClick={toggleItemModal}>Add Item</Button>
            <div className="search-div">
                <Button className="search-x" onClick={clearSearch}><FontAwesomeIcon icon={faTimes}/></Button>
                <Form.Control
                    type="text"
                    className="mb-4"
                    id="item-search"
                    name="search"
                    placeholder="Search"
                    onChange={searchPattern}
                />
            </div>
            { categoryInfo.map((category) => 
                <div
                    key={`category-id-${category.category_id}`}
                    className="pb-3"
                >    
                    <Row className="category-title"><h2>{category.category_name}</h2></Row>
                    <ul>
                        {
                            category.items.map((item,index) =>
                                <li className="d-flex ps-2" key={category.category_id + index.toString()}>
                                    <div className="me-auto pt-1">
                                        <label
                                            className="checkbox-container"
                                            htmlFor={item.item_id}
                                        >
                                            <p>{item.item_name}</p>
                                            <input
                                                type="checkbox"
                                                id={item.item_id}
                                                key={index}
                                                checked={item.selected ? true : false}
                                                onChange={(evt) => updateSelection(item.item_id, evt.target.checked)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="icon-col-min-width ms-2">
                                        <Button
                                            className="item-button"
                                            variant="outline-dark"
                                            size="sm"
                                            onClick={() => enterEditMode(item.item_id)}
                                        >
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </Button>
                                        <Button
                                            className="item-button"
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => toggleAlertModal(item.item_id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Button>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            )}
        </Container>
    );
}

export default UpdateList;