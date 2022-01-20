import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import BasketItem from "./BasketItem";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const BasketList = observer(() => {
    return (
        <Row>
            {basket.map(device =>
                <BasketItem device={device} key={device.id}/>
            )}
        </Row>
    );
});

export default BasketList;
