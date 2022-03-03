// React
import React from 'react';

// Import Axios calls and Category display order
import axiosRequest from '../axios/UpdateList';
import categoryOrder from '../config/category_order';
import { buildMapArray } from '../compute/build_map_array';

// Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../App.css';

// FontAwesome
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faUndo} from '@fortawesome/free-solid-svg-icons';

// StoreList componenet
const UpdateList = ({ deselectComplete, toggleDeselect }) => {

    const [categoryItemsTable, setCategoryItemsTable] = React.useState([]);
    const [categoryKeys, setCategoryKeys] = React.useState({});
    const [categoryInfo, setCategoryInfo] = React.useState([]);
    const [changedItems, setChangedItems] = React.useState({});    
    const [alert, setAlert] = React.useState({
        alert: false,
        message: null,
        variant: null
    });

    React.useEffect(() => {
        if (deselectComplete) {
            localStorage.removeItem('unselectedItemIds');
            console.log('Requesting Categories & corresponding Items from dB...');
            axiosRequest.getAll()
            .then(res => {
                setCategoryItemsTable(res.data);
                console.log('Categories & Items successfully queried!');
                if (deselectComplete) toggleDeselect();
                if (localStorage.alert) setAlert(JSON.parse(localStorage.alert));
            })
            .catch(err => (console.log(`Client-side Result Error: ${err}`)));
        }
    }, [deselectComplete, toggleDeselect]);

    React.useEffect(() => {

        let categoryObject = {};
        for (let row of categoryItemsTable) {
            if (categoryObject[row.category_id]) {
                categoryObject[row.category_id].item_id.push(row.item_id);
                categoryObject[row.category_id].item_name.push(row.item_name);
                categoryObject[row.category_id].selected.push(row.selected);
            } else {
                categoryObject[row.category_id] = {
                    category_id: row.category_id,
                    category_name: row.category_name,
                    item_id: [row.item_id],
                    item_name: [row.item_name],
                    selected: [row.selected]
                }
            }
        }

        setCategoryKeys(categoryObject);

    }, [categoryItemsTable]);


    React.useEffect(() => {

        let newArray = buildMapArray(categoryKeys, categoryOrder, "category_id");
        setCategoryInfo(newArray);

    }, [categoryKeys]);


    const updateCategoryKeys = ((catId,idx,item_id) => {

        let updatedObj = categoryKeys;
        if (!updatedObj[catId].selected[idx]) updatedObj[catId].selected[idx] = 1;
        else updatedObj[catId].selected[idx] = 0;

        let updateArray = buildMapArray(updatedObj, categoryOrder, "category_id");
        setCategoryInfo(updateArray);

        let itemKeys = changedItems;
        itemKeys[item_id] = updatedObj[catId].selected[idx];
        setChangedItems(itemKeys);

    })

    const allDone = () => {

        let dbUpdate = [[],[]];
        for (let id of Object.keys(changedItems)) {
            if (changedItems[id] === 0) dbUpdate[0].push(id);
            else dbUpdate[1].push(id);
        }
        console.log(dbUpdate);

        axiosRequest.updateSelections(dbUpdate)
            .then(() => {
                console.log(`Changed Items Updated in dB.`);
                localStorage.setItem('alert', JSON.stringify({
                    alert: true,
                    message: "Shopping List updated!",
                    variant: "success"
                }));
                window.location.reload();
            })
            .catch((err) => console.log(`Error updating changed items in shopping list: ${err}`));
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
            }, 1500);
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
            <Button variant="primary" size="lg" className="my-4 float-right" onClick={() => allDone()}>Save</Button>
            <Accordion>
                { categoryInfo.map((category) => 
                    <Accordion.Item eventKey={category.category_id} key={category.category_id}>
                        <Accordion.Header>
                            <span className="fw-bolder fs-5">{category.category_name}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            {
                                category.item_name.map((item,index) =>
                                    <div className="form-check" key={(index+1)*100}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={item+index.toString()}
                                            name={item+index.toString()}
                                            key={index}
                                            checked={
                                                !category.selected[index] ? false : true
                                            }
                                            onChange={() => updateCategoryKeys(category.category_id, index, category.item_id[index])}
                                        />
                                        <label
                                            className="fs-6 ps-2 form-check-label"
                                            htmlFor={item+index.toString()}
                                            key={(index+1)*1000}
                                        >
                                            {item}
                                        </label>
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

export default UpdateList;