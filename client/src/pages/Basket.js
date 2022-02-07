import React, {useContext, useEffect, useState} from 'react';
import BasketList from "../components/Basket/BasketList";
import {fetchBasket} from "../http/basketAPI";
import classes from "../modules/Basket.module.css";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, Row} from "react-bootstrap";
import {calculateDevicesPrice} from "../helpers/basketHelper";

const Basket = observer(() => {
    const {basket} = useContext(Context)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const loadBasket = () => fetchBasket().then(data => {
        basket.setBasketDevices(data.devices)
        const startPrice = calculateDevicesPrice(data)
        setTotalPrice(startPrice)
        setTotalCount(basket.basketDevices.length)
    })

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
                        <BasketList basket={basket}
                                    totalPrice={totalPrice}
                                    setTotalPrice={setTotalPrice}/>
                    </div>
                </div>
                Загальна сума покупки: {totalPrice}
                {/*<Col md={4}>*/}
                {/*    <Card className={classes.info}>*/}
                {/*        <div className={classes.price}>*/}
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
