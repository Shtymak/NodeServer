import React, {useContext, useEffect, useState} from 'react';
import BasketList from "../components/Basket/BasketList";
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
            <div className={classes.blur}>
            </div>
            <Row>
                <div className={classes.title}>
                    <h1>Кошик</h1>
                </div>
                <div className={classes.show}>
                    <span className={classes.title}>Назва</span>
                    <span className={classes.text}>Ціна</span>
                    <span className={classes.count}>Кількість</span>
                </div>
                <hr/>
                <div className={classes.content}>
                    <div>
                        <BasketList basket={basket} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
                    </div>
                </div>


                {/*<Col md={4}>*/}
                {/*    <Card className={classes.info}>*/}
                {/*        <div className={classes.price}>*/}
                {/*            Загальна сума покупки: {totalPrice}*/}
                {/*        </div>*/}
                {/*        <div className={classes.price}>*/}
                {/*            Кількість одиниць: {totalCount}*/}
                {/*        </div>*/}
                {/*    </Card>*/}
                {/*</Col>*/}
            </Row>
        </Container>
    );
});

export default Basket;
