import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const isLogin = useLocation().pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const enter = async () => {
        try {
            let userData
            if (isLogin === false) {
                userData = await registration(email, password)
                console.log(userData)
            } else {
                userData = await login(email, password)
                console.log(userData)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        }
        catch (error){
            const message = error.response.data.message
            alert(message)
        }
    }
    return (
        <Container className="justify-content-center align-items-center d-flex"
                   style={{height: window.innerHeight - 54}}>
            <Card className="p-5"
                  style={{width: 600}}>
                <h2 className="m-auto">{isLogin ? 'Вхід' : 'Авторизація'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-2 pr-3 pl-3">
                        {isLogin ?
                            <div>
                                Немає профілю? <NavLink to={REGISTRATION_ROUTE}>Зареєсртуватися!</NavLink>
                            </div> :
                            <div>
                                Маєте профіль? <NavLink to={LOGIN_ROUTE}>Ввійти!</NavLink>
                            </div>
                        }
                        <Button onClick={enter}>{isLogin ? 'Ввійти' : 'Зареєструватися'}</Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
