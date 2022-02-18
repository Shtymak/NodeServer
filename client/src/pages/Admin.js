import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import "../modules/Admin.css"
import {Col, Container, Row} from "react-bootstrap";
import Button from "../components/Admin/Button"

import UserList from "../components/Admin/UserList";
import {getAllUsers} from "../http/userAPI";

const Admin = observer(() => {
    const {user} = useContext(Context)

    function loadUsers() {
        getAllUsers().then(data => {
            user.setUsers(data.users)
        })
    }

    useEffect(loadUsers, [])

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
                                <span>Користувачі</span>
                                <hr/>
                                <div className="items">
                                    <UserList user={user}/>
                                </div>
                            </Col>
                            <Col md={7} className="device-tools">
                                <span>Девайси</span>
                                <hr/>
                                <div className="items">
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
                                    <h2>Девайс</h2>
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
