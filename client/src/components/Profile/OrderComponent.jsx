import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import "../../modules/orderComponent.css"
import {Image} from "react-bootstrap";
import classes from "../../modules/UserDeviceItem.module.css";
import {getAllUsers} from "../../http/userAPI";

const OrderComponent = observer(({device}) => {
    const [user, setUser] = useState({})

    function loadUser() {
        getAllUsers().then(data => {
            setUser(data.users.find(x => x.id === device.shopperId))
        })
    }

    useEffect(loadUser, [])
    return (
        <div className="order-box">
            <Image src={process.env.REACT_APP_API_URL + device.img}
                   className="img"/>
            {device.name}
            <div>
                Купив: {user.email}
            </div>
        </div>
    );
});

export default OrderComponent;
