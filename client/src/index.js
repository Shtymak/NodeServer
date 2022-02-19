import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from "../src/App"
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
import {ToastContainer} from "react-toastify";

export const Context = createContext(null)


ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        basket: new BasketStore()
    }}>
        <App/>
        <ToastContainer/>
    </Context.Provider>,

    document.getElementById('root')
);

