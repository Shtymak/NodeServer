import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import App from "../src/App"
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = useContext(null)


ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

