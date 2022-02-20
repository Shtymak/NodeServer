import React, {useContext, useEffect, useState} from 'react';
import BasketList from "../components/Basket/BasketList";
import {fetchBasket, fetchOrder} from "../http/basketAPI";
import "../modules/Basket.css";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, Row} from "react-bootstrap";
import {calculateDevicesPrice} from "../helpers/basketHelper";
import {SHOP_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const Basket = observer(() => {
    const history = useHistory()
    const {basket} = useContext(Context)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const loadBasket = () => fetchBasket().then(data => {
        basket.setBasketDevices(data.devices)
        const startPrice = calculateDevicesPrice(data)
        setTotalPrice(startPrice)
        setTotalCount(basket.basketDevices.length)
    })

    async function sendMail() {
        const data = {
            totalPrice,
            totalCount,
            devices: basket.basketDevices,
        }
        await fetchOrder(data)
        basket.setBasketDevices([])
        setTotalCount(0)
        setTotalPrice(0)
    }

    useEffect(loadBasket, [])
    return (
        <Container className="">
            <div className="blur">
            </div>
            <Row>
                <div className="title">
                    <h1>Кошик</h1>
                </div>
                <hr/>
                <div className="content">
                    <div>
                        <BasketList basket={basket}
                                    totalPrice={totalPrice}
                                    setTotalPrice={setTotalPrice}/>
                    </div>
                </div>
                <div className="order">
                    Загальна сума покупки: {totalPrice}
                    <button className="button-13"
                            role="button"
                            onClick={sendMail}
                            disabled={!basket.basketDevices.length > 0}
                    >
                        {basket.basketDevices.length > 0 ?
                            <span>Замовити!</span> :
                            <a href={SHOP_ROUTE}> До Товарів!</a>
                        }
                    </button>
                </div>
            </Row>
        </Container>
    );
});

export default Basket;
