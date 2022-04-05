// React
import React from 'react';

// Import Axios calls
import axiosRequest from '../axios/CurrentList';

// Import compute functions
// import { mapIds } from '../compute/map_ids';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import '../App.css';

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUndo, faCheck} from '@fortawesome/free-solid-svg-icons';

// Current List of selected items and their corresponding stores, organized by store_id...
const CurrentList = ({ deselectComplete, toggleDeselect }) => {

    const [verified, setVerified] = React.useState(false);
    const [storeItemsTable, setStoreItemsTable] = React.useState([]);
    const [storeInfo, setStoreInfo] = React.useState([]);
    const [undoStack, setUndoStack] = React.useState([]);
    
    React.useEffect(() => {
        console.log('Executing initial Current List useEffect...');
        if (deselectComplete) {
            localStorage.removeItem('unselectedItemIds');
            console.log('Requesting Current List from dB...');
            axiosRequest.getAll()
                .then(res => {
                    setVerified(true);
                    setStoreItemsTable(res.data);
                    console.log('Current List successfully queried!');
                    toggleDeselect();
                })
                .catch(err => {
                    console.log(err);
                    window.location.pathname = '/';
                });
        }
    }, [deselectComplete, toggleDeselect]);


    React.useEffect(() => {

        let storeObject = {};
        for (let row of storeItemsTable) {
            if (storeObject[row.store_id]) {
                storeObject[row.store_id].item_id.push(row.item_id);
                storeObject[row.store_id].item_name.push(row.item_name);
            } else {
                storeObject[row.store_id] = {
                    store_id: row.store_id,
                    store_name: row.store_name,
                    neighborhood: row.neighborhood,
                    item_id: [row.item_id],
                    item_name: [row.item_name]
                }
            }
        }

        let storeArray = [];
        for (let id of Object.keys(storeObject)) {
            storeArray.push(storeObject[id]);
        }

        setStoreInfo(storeArray);

    }, [storeItemsTable]);


    const removeItem = (val) => {

        console.log(`Removing value: ${val}`);

        let currentUndo = storeItemsTable.filter(item => item.item_id === val);
        setUndoStack(undoStack.concat(currentUndo));

        if (localStorage.unselectedItemIds) {
            let currentStorage = JSON.parse(localStorage.unselectedItemIds);
            currentStorage.push(val);
            localStorage.setItem('unselectedItemIds', JSON.stringify(currentStorage));
        } else {
            let newStorageArray = [val];
            localStorage.setItem('unselectedItemIds', JSON.stringify(newStorageArray));
        }

        let revisedArray = storeItemsTable.filter(item => item.item_id !== val);
        setStoreItemsTable(revisedArray);
    }

    const popUndoStack = () => {
        if (!!undoStack.length) {

            let id = undoStack[undoStack.length-1].item_id;
            let tempItems = undoStack.filter(item => item.item_id === id);
            setStoreItemsTable(storeItemsTable.concat(tempItems));
            setUndoStack(undoStack.filter(item => item.item_id !== id));

            let currentStorage = JSON.parse(localStorage.unselectedItemIds);
            currentStorage.pop();
            localStorage.setItem('unselectedItemIds', JSON.stringify(currentStorage));
        }
    }

    return (

        <Container className="max-container-width">
            {   verified &&
                <Button variant="warning" size="lg" className="my-3" onClick={popUndoStack}><FontAwesomeIcon icon={faUndo}/></Button>
            }
            <Accordion>
                { storeInfo.map((store, index) => 
                    <Accordion.Item eventKey={index} key={store.store_id.toString() + index.toString()}>
                        <Accordion.Header>
                            <span className="store-font">{store.store_name}</span>
                            <Badge pill bg="success" className="ms-2">{store.item_name.length}</Badge>
                            <span className="neighborhood-font text-secondary ps-2">{store.neighborhood}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            {
                                store.item_name.map((item,index) =>
                                        <Row key={store.store_id.toString() + store.item_id[index].toString() + index.toString()}>
                                            <Col xs={2}>
                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    className="my-1 float-end"
                                                    onClick={() => removeItem(store.item_id[index])}
                                                >
                                                    <FontAwesomeIcon icon={faCheck}/>
                                                </Button>
                                            </Col>
                                            <Col xs={10} className="d-flex align-items-center">
                                                <span>{item}</span>
                                            </Col>
                                        </Row>
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