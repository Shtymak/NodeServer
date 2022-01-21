import React, {useContext, useEffect} from 'react';
import BasketList from "../components/BasketList";
import {fetchBasket} from "../http/basketAPI";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Basket = observer(() => {
    const {basket} = useContext(Context)
    const loadBasket = () => fetchBasket().then(data=>basket.setBasketDevices(data.devices))
    useEffect(loadBasket,[])
    return (
        <div>
            <BasketList/>
        </div>
    );
});

export default Basket;
