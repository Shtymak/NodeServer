import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {check, fetchUserDevices} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";

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
    const currentUser = user.data
    return (
        <div>
            {currentUser.email}
            {user.devices ?
                user.devices.map(device =>
                    <div key={device.id}>
                        <p onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>{device.name}</p>
                    </div>)
                :
                <div>Ви не публікували товари</div>}
            <Button>Додати новий товар</Button>
        </div>
    );
});

export default Profile;
