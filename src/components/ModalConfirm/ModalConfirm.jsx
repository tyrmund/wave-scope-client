import { Button, Modal } from 'react-bootstrap'

const ModalConfirm = ({ show, handleClose, handleConfirm, bodyMessage, buttonMessage }) => {

    return (
        <Modal className="ModalConfirm"
            show={show}
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyMessage}</Modal.Body>
            <Modal.Footer>
                <Button className='custom-color-button' onClick={handleClose}>
                    Cancel
                </Button>
                <Button className='delete-color-button' onClick={handleConfirm}>
                    {buttonMessage}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm