import React, {useContext, useState} from 'react';
import {Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import UserDeviceItem from "./UserDeviceItem";
import {removeDevice} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const UserDeviceList = observer(({show, handleClose}) => {
    const {user} = useContext(Context)
    const removeItem = async (device) => {
        user.setDevices(user.devices.filter(x => x.id !== device.id))
        await removeDevice(device)
    }
    return (
        <Modal show={show} onHide={handleClose}>
            {user.devices.length > 0 ?
                <Row className="d-flex">
                    {user.devices.map(device => <UserDeviceItem key={device.id} device={device}
                                                                removeItem={removeItem}/>)}
                </Row>
                :
                <div style={{minHeight: 50, textAlign: "center", marginTop: 10}}>Ви не публікували товари</div>}
        </Modal>
    );
});

export default UserDeviceList;
