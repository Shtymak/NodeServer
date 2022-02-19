import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import "../modules/Admin.css"
import {Col, Container, Row} from "react-bootstrap";
import Button from "../components/Admin/Button"

import UserList from "../components/Admin/UserList";
import {getAllUsers} from "../http/userAPI";
import UserDeviceList from "../components/Profile/UserDeviceList";
import AdminDeviceList from "../components/Admin/AdminDeviceList";
import {fetchDevice} from "../http/deviceApi";

const Admin = observer(() => {
    const {user} = useContext(Context)
    const [deviceCount, setDeviceCount] = useState(0)
    const [userCount, setUserCount] = useState(0)
    function loadUsers() {
        getAllUsers().then(data => {
            user.setUsers(data.users)
            setUserCount(data.count)
        })
    }

    useEffect(loadUsers, [])
    useEffect(() => fetchDevice().then(data => setDeviceCount(data.count)), [])
    return (
        <div>
            <Container className="parent">
                <Row>
                    <Col md={3} className="tools">
                        <span>
                            Керування типами і брендами
                            <hr/>
                        </span>
                        <div className='types'>
                            <span>Типи</span>
                            <Button>Додати Тип</Button>
                            <Button>Оновити Тип</Button>
                            <Button>Видалити Тип</Button>
                        </div>
                        <div className="brands">
                            <span>Бренди</span>
                            <Button>Додати Бренд</Button>
                            <Button>Оновити Бренд</Button>
                            <Button>Видалити Бренд</Button>
                        </div>
                    </Col>
                    <Col md={8} className="tools">
                            <span>
                            Керування користувачами і девайсами
                            <hr/>
                        </span>
                        <div className="rows">
                            <Col md={4} className="user-tools">
                                <span>Користувачі({userCount})</span>
                                <hr/>
                                <div className="items">
                                    <UserList user={user}/>
                                </div>
                            </Col>
                            <Col md={7} className="device-tools">
                                <span>Девайси({deviceCount})</span>
                                <hr/>
                                <div className="items">
                                    <AdminDeviceList/>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Admin;
