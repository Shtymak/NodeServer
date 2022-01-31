import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {check, fetchUserDevices} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import UserDeviceList from "../components/Profile/UserDeviceList";

const Profile = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const loadUser = () => check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    })
    const loadUserDevices = () =>
        fetchUserDevices().then(data => user.setDevices(data.rows || []))

    useEffect(async () => {
        loadUser()
        await loadUserDevices()
    }, [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    const currentUser = user.data
    return (
        <div>
            {currentUser.email}
            {user.devices ?
                <UserDeviceList show={show} handleClose={handleClose}/>
                :
                <div>Ви не публікували товари</div>}
            <Button>Додати новий товар</Button>
            <Button variant="primary" onClick={handleShow}>
                Мої публікації
            </Button>
        </div>
    );
});

export default Profile;
