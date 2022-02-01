import React, {useContext} from 'react';
import {Context} from "../index";
import {BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE} from "../utils/consts";
import "../modules/index.css"
import {observer} from "mobx-react-lite";
import {Link, useHistory} from "react-router-dom";
import basket from "../assets/basket.png"
import login from "../assets/login.png"


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
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
                    {user.isAuth ?
                        <li className="list-item">
                            <Link to={PROFILE_ROUTE} className="link-light">
                                Профіль
                            </Link>
                        </li> : <div>

                        </div>
                    }
                </ul>
                {user.isAuth ? (
                        <button
                            type="button"
                            className="theme-button"
                            onClick={() => history.push(BASKET_ROUTE)}>
                            <img
                                src={basket}
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
        </div>
    );
});
// <Navbar bg="dark" variant="dark">
// <Container>
// <NavLink className={classes.main_link} onClick={() => history.push(SHOP_ROUTE)}>Dodo</NavLink>
// <Nav className='d-flex basket'>
// <Image src={basket}
//                    className={classes.basket}
//                    onClick={() => history.push(BASKET_ROUTE)}/>
//         </Nav>
//         {user.isAuth ?
//             <Nav className={classes.nav_components}>
//                 <Button variant={"outline-primary"}
//                         onClick={() => logOut()}>Вийти</Button>
//             </Nav>
//             :
//             <Nav className={classes.nav_components}>
//                 <Button variant={"outline-primary"} onClick={() => history.push(LOGIN_ROUTE)}>Ввійти</Button>
//             </Nav>
//         }
//
//     </Container>
// </Navbar>
export default NavBar;
