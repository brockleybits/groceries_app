// React
import React from 'react';

// Bootstrap and CSS
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


// StoreList componenet
const AlertModal = ({ modalOpen, toggleModal, alertInfo, modalAction }) => {

    return (
        <Modal show={modalOpen} onHide={() => toggleModal(null)}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase">{alertInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <p>
                            {alertInfo.body}
                        </p>
                        <div className="d-flex">
                            <Button
                                className="me-auto"
                                variant="secondary"
                                onClick={() => toggleModal(null)}
                                >Cancel
                            </Button>
                            <Button
                                variant={alertInfo.variant}
                                onClick={modalAction}
                                >{alertInfo.button}
                            </Button>
                        </div>
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    )
}

export default AlertModal;