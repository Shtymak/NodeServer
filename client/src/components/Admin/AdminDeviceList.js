import React, {useContext, useEffect, useState} from 'react';
import {Row, Card} from "react-bootstrap";
import UserDeviceItem from "../Profile/UserDeviceItem";
import {noContent} from "../../utils/style";
import {Context} from "../../index";
import {fetchDevice, removeDevice} from "../../http/deviceApi";
import "../../modules/Admin.css"

const AdminDeviceList = () => {
    const {user} = useContext(Context)
    const removeItem = async (device) => {
        user.setDevices(user.devices.filter(x => x.id !== device.id))
        await removeDevice(device)

    }
    const [devices, setDevices] = useState([])
    useEffect(() => fetchDevice().then(data => setDevices(data.rows)), [])
    return (
        <div className="user-list">
            {devices.length > 0 ?
                <Row className="d-flex">
                    {devices.map(device =>
                        <UserDeviceItem key={device.id}
                                        device={device}
                                        removeItem={removeItem}/>)}
                </Row>
                :
                <div style={noContent}>
                    Ви не публікували товари
                </div>
            }
        </div>

    );
};

export default AdminDeviceList;
