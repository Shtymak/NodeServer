import React from 'react';
import {Modal} from "react-bootstrap";

const AddProductModal = ({show, handleClose, hide}) => {
    return (
        <Modal show={show} onHide={() => handleClose(hide)}>
            Hello
        </Modal>
    );
};

export default AddProductModal;
