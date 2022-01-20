import React, {useEffect} from 'react';
import BasketList from "../components/BasketList";
import {fetchBasket} from "../http/basketAPI";
import {login} from "../http/userAPI";

const Basket = () => {
    return (
        <div>
            <BasketList/>
        </div>
    );
};

export default Basket;
