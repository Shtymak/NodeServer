import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {LOGIN_ROUTE} from "../utils/consts";
import "../modules/index.css"
import {observer} from "mobx-react-lite";
import {Link, useHistory} from "react-router-dom";
import logout from "../assets/logout.png"
import login from "../assets/login.png"
import {loadUserDevices, loadUser, logOut} from "../helpers/userHelper";
import {handleCloseDevices, handleShowDevices, handleShowAddDevice, handleCloseAddDevice, handleShowOrder, handleCloseOrder} from "../helpers/modalHelper";
import AddDeviceModal from "./Profile/AddDeviceModal";
import DeviceModal from "./Profile/DeviceModal";
import OrderModal from './Profile/OrderModal';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [showDevices, setShowDevices] = useState(false);
    const [showAddDevice, setShowAddDevice] = useState(false)
    const [showOrders, setShowOrders] = useState(false)

    useEffect(async () => {
        await loadUser(user)
        await loadUserDevices(user)
    }, [])

    return (
        <div>
            <div className="nav-bar-container-light">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png"
                    className="website-logo"
                    alt="website logo"
                />
                <ul className="middle-items">
                    <li className="list-item">
                        <Link to="/"
                              className="link-light">
                            Товари
                        </Link>
                    </li>
                    {user.isAuth ? (
                        <ul className="middle-items">
                            <li className="list-item">
                                <Link onClick={() => handleShowAddDevice(setShowAddDevice)}
                                      className="link-light">
                                    Додати товар
                                </Link>
                            </li>
                            <li className="list-item">
                                <Link onClick={() => handleShowDevices(setShowDevices)}
                                      className="link-light">
                                    Мої товари
                                </Link>
                            </li>
                            <li className="list-item">
                                <Link onClick={() => handleShowOrder(setShowOrders)}
                                      className="link-light">
                                    Мої замовлення
                                </Link>
                            </li>
                        </ul>) : <div>

                    </div>
                    }
                </ul>
                {user.isAuth ? (
                        <button
                            type="button"
                            className="theme-button"
                            onClick={() => logOut(user, history)}>
                            <img
                                src={logout}
                                className="theme-img"
                                alt="theme"
                            />
                        </button>)
                    :
                    (<button
                        type="button"
                        className="theme-button"
                        onClick={() => history.push(LOGIN_ROUTE)}>
                        <img
                            src={login}
                            className="theme-img"
                            alt="theme"
                        />
                    </button>)
                }
            </div>
            <DeviceModal show={showDevices}
                         handleClose={handleCloseDevices}
                         setShowDevices={setShowDevices}
            />
            <AddDeviceModal show={showAddDevice}
                            handleClose={handleCloseAddDevice}
                            hide={setShowAddDevice}
            />
            <OrderModal show={showOrders}
                         handleClose={handleCloseOrder}
                         setShowDevices={setShowOrders}
                         />
        </div>
    );
});
export default NavBar;
