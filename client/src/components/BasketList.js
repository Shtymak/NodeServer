import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import BasketItem from "./BasketItem";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const BasketList = observer(() => {
    const {basket} = useContext(Context)
    const deleteBasketDevice = (id) =>
        basket.setBasketDevices(basket.basketDevices.filter(x => x.id !== id))
    return (
        <Row>
            {basket.basketDevices.map(device =>
                <BasketItem device={device} deleteFromBasketList={deleteBasketDevice} key={device.id}/>
            )}
        </Row>
    );
});

export default BasketList;
