import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import BasketItem from "./BasketItem";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const BasketList = observer(({basket, totalPrice, setTotalPrice}) => {
    const deleteBasketDevice = (id) =>
        basket.setBasketDevices(basket.basketDevices.filter(x => x.id !== id))
    return (
            <Row>
                {basket.basketDevices.map(device =>
                    <BasketItem total={totalPrice} device={device} setTotalPrice={setTotalPrice}
                                deleteFromBasketList={deleteBasketDevice} key={device.id}/>
                )}
            </Row>
    );
});

export default BasketList;
