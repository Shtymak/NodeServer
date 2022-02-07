import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import classes from "../../modules/UserDeviceItem.module.css"
import {DEVICE_ROUTE} from "../../utils/consts";
import {NavLink} from "react-router-dom";
import remove from "../../assets/remove.png"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {observer} from "mobx-react-lite";
import {deleteItem} from "../../helpers/userHelper";

const UserDeviceItem = observer(({device, removeItem}) => {
    return (
        <Col md={12} className={classes.content}>
            <Card className={classes.card}>
                <div className={classes.column}>
                    <Image src={process.env.REACT_APP_API_URL + device.img}
                           className={classes.icon}/>
                    <div className={classes.column}>
                        <NavLink to={`${DEVICE_ROUTE}/${device.id}`}>
                            {device.name}
                        </NavLink>
                    </div>
                    <Image src={remove}
                           className={classes.remove}
                           onClick={() =>
                               deleteItem({device, removeItem})}/>
                </div>
            </Card>
            <ToastContainer/>
        </Col>
    );
});

export default UserDeviceItem;
