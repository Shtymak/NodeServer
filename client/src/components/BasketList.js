import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import BasketItem from "./BasketItem";
import {Context} from "../index";

const BasketList = () => {
    const device = []
    return (
        <Row>
            {device.map(device =>
                <BasketItem device={device} key={device.id}/>
            )}
        </Row>
    );
};

export default BasketList;
