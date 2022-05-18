// React
import React from 'react';

// Import Axios calls
import axiosRequest from '../axios/CurrentList';

// Bootstrap and CSS
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUndo} from '@fortawesome/free-solid-svg-icons';

// Current List of selected items and their corresponding stores, organized by store_id...
const CurrentList = () => {

    const [storeInfo, setStoreInfo] = React.useState([]);
    const [storeOrder, setStoreOrder] = React.useState([]);
    const [undoStack, setUndoStack] = React.useState([]);
    const [noInfo, setNoInfo] = React.useState(false);
    const [alert, setAlert] = React.useState({
        alert: false,
        message: null,
        variant: null
    });
    

    React.useEffect(() => {
        axiosRequest.getAll()
            .then(result => {
                setStoreInfo(result.data[0]);
                if (result.data[0].length === 0) setNoInfo(true);
                setStoreOrder(result.data[1]);
            })
            .catch(err => {
                console.log(err);
                window.location.pathname = '/';
            });

    }, []);


    const updateSelection = (item_id, undo) => {
        if (undo && undoStack.length === 0) return;
        if (undo) item_id = undoStack[undoStack.length-1];
        let value = undo ? 1 : 0;
        axiosRequest.updateItemSelection({
            item_id,
            value,
            store_order: storeOrder
        })
        .then((result) => {
            let newUndoStack = undo ? undoStack.filter(id => id !== item_id) : [...undoStack, item_id];
            setUndoStack(newUndoStack);
            setTimeout(() => {
                if (result.data.length === 0) setNoInfo(true);
                setStoreInfo(result.data);
            }, 220);
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
                noInfo ?
                <div className="no-info-alert">
                    <h1>Add Items</h1>
                    <p>Looks like you don't have any items to shop for. Head on over to <a href="/shopping-list">Shopping List</a> to add items.</p>
                </div>
                :
                <Button 
                    variant="warning"
                    size="lg"
                    className="mb-3"
                    onClick={() => updateSelection(null,true)}
                    ><FontAwesomeIcon icon={faUndo}/>
                </Button>
            }
            <Accordion>
                { storeInfo.map((store, index) => 
                    <Accordion.Item className="accordion-item" eventKey={index} key={`store-id-${store.store_id}`}>
                        <Accordion.Header className="accordion-header">
                            <h1 className="store-font">{store.store_name}</h1>
                            <Badge pill bg="success" className="ms-2">{store.store_item_count}</Badge>
                            <span className="neighborhood-font text-secondary ms-2">{store.neighborhood}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            {
                                store.categories.map((category) =>
                                    <div
                                        key={`store-id-${store.store_id}-category-id-${category.category_id}`}
                                        className="pb-3"
                                    >
                                        <Row className="category-title"><h2>{category.category_name}</h2></Row>
                                        {
                                            category.items.map((item) => 
                                                <Row className="ps-3 py-0" key={`store-id-${store.store_id}-item-id-${item.item_id}`}>
                                                    <label
                                                        className="fs-6 checkbox-container"
                                                    >
                                                        <p>{item.item_name}</p>
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => updateSelection(item.item_id,false)}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </Row>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </Container>
    );
}

export default CurrentList;