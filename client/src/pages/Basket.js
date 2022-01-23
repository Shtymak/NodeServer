import React, {useContext, useEffect, useState} from 'react';
import BasketList from "../components/BasketList";
import {fetchBasket} from "../http/basketAPI";
import classes from "../modules/Basket.module.css";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Container, Row} from "react-bootstrap";

const Basket = observer(() => {
    const {basket} = useContext(Context)
    const loadBasket = () => fetchBasket().then(data => {
        basket.setBasketDevices(data.devices)
        const startPrice = data.devices.reduce((total, device) =>
            total + device.price, 0)
        setTotalPrice(startPrice)
        setTotalCount(basket.basketDevices.length)
    })
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    useEffect(loadBasket, [])
    return (
        <Container className={classes.box}>
            <Row>

                    <div className={classes.title}>
                        <h1 className="">Кошик</h1>
                    </div>
                <Col md={8}>
                    <div>
                        <BasketList basket={basket} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
                    </div>
                </Col>
                <Col md={4}>
                    <Card className={classes.info}>
                        <div className={classes.price}>
                            Загальна сума покупки: {totalPrice}
                        </div>
                        <div className={classes.price}>
                            Кількість одиниць: {totalCount}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default Basket;
