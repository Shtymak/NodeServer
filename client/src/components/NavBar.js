import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE} from "../utils/consts";
import "../modules/index.css"
import {observer} from "mobx-react-lite";
import {Link, useHistory} from "react-router-dom";
import logout from "../assets/logout.png"
import login from "../assets/login.png"
import {check, fetchUserDevices} from "../http/userAPI";
import UserDeviceList from "./Profile/UserDeviceList";



const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
        history.push(SHOP_ROUTE)
    }
    const loadUser = () => check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    })
    const loadUserDevices = () =>
        fetchUserDevices().then(data => user.setDevices(data.rows || []))

    useEffect(async () => {
        await loadUser()
        await loadUserDevices()
    }, [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
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
                        <Link to="/" className="link-light">
                            Товари
                        </Link>
                    </li>
                    {user.isAuth ? (
                        <ul className="middle-items">
                            <li className="list-item">
                                <Link  className="link-light">
                                    Додати товар
                                </Link>
                            </li>
                            <li className="list-item">
                                <Link onClick={handleShow} className="link-light">
                                    Мої товари
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
                            onClick={() => logOut()}>
                            <img
                                src={logout}
                                className="theme-img"
                                alt="theme"
                            />
                        </button>) :
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
            < /div>
            <UserDeviceList show={show} handleClose={handleClose}/>

        </div>
    );
});
export default NavBar;
