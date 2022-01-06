import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import classes from "../modules/Auth.module.css"

const Auth = () => {
    return (
        <Container className="justify-content-center align-items-center d-flex"
                   style={{height: window.innerHeight - 54}}>
            <Card className="p-5"
                  style={{width: 600}}>
                <h2 className="m-auto">Авторизація</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-2" placeholder="Email"/>
                    <Form.Control className="mt-2" placeholder="Пароль"/>
                    <Button className="mt-2 align-self-end">Ввійти</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
