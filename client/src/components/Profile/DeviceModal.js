import React from 'react';
import {observer} from "mobx-react-lite";
import UserDeviceList from "./UserDeviceList";
import {Modal} from "react-bootstrap";



const DeviceModal = observer(({show, handleClose, setShowDevices}) => {

    return (
        <Modal show={show} onHide={() => handleClose(setShowDevices)}>
            <UserDeviceList/>
        </Modal>
    );
});

export default DeviceModal;
