// React
import React from 'react';

// Reactstrap
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

// Redux
import {connect} from 'react-redux';
import {addStore} from '../redux/actions/storeActions';

// AddStore componenet
const AddStore = (props) => {

    const [modalOpen, setModalOpen] = React.useState(false);
    const toggle = () => setModalOpen(!modalOpen);

    const newStore = {
        st_name: '',
        neighborhood: ''
    }
    
    const onChange = evt => {
        if (evt.target.name === 'store_name'){
            newStore.st_name = evt.target.value
        }
        if (evt.target.name === 'store_neighborhood'){
            newStore.neighborhood = evt.target.value
        }
    }

    const onSubmit = evt => {
        evt.preventDefault();
        props.addStore(newStore);
        toggle();
    }

    return (
        <div>
            <Button
                color="info"
                style={{marginBottom: '2rem'}}
                onClick={toggle}
            >Add Store
            </Button>
            <Modal isOpen={modalOpen} toggle={toggle} autoFocus={false}>
                <ModalHeader toggle={toggle}>
                    Add Store
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="storeName">Store Name</Label>
                            <Input 
                                type="text"
                                name="store_name"
                                id="storeName"
                                placeholder="Enter Store Name"
                                onChange = {onChange}
                                autoFocus = {true}
                            />
                            <br />
                            <Label for="neighborHood">Neighborhood</Label>
                            <Input 
                                type="text"
                                name="store_neighborhood"
                                id="neighborHood"
                                placeholder="Enter Neighborhood"
                                onChange = {onChange}
                            />
                            <br />
                        </FormGroup>
                        <Button
                            type="submit"
                            color="dark"
                            block
                            >Add Store
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default connect(null,{addStore})(AddStore);