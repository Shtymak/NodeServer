import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../../index";
import UserDeviceItem from "./UserDeviceItem";
import {removeDevice} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";
import {noContent} from "../../utils/style";

const UserDeviceList = observer(() => {
    const {user} = useContext(Context)
    const removeItem = async (device) => {
        user.setDevices(user.devices.filter(x => x.id !== device.id))
        await removeDevice(device)
    }
    return (
        <div>
            {user.devices.length > 0 ?
                <Row className="d-flex">
                    {user.devices.map(device =>
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
});

export default UserDeviceList;
