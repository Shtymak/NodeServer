import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar, NavLink} from "react-bootstrap";
import {BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import classes from "../modules/NavBar.module.css"
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import basket from "../assets/basket.png"

const NavBar = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink className={classes.main_link} onClick={()=> history.push(SHOP_ROUTE)}>Dodo</NavLink>
                <Nav className='d-flex basket'>
                    <Image src={basket}
                           className={classes.basket}
                    onClick={() => history.push(BASKET_ROUTE)}/>
                </Nav>
                {user.isAuth ?
                    <Nav className={classes.nav_components}>
                        <Button variant={"outline-primary"}
                                onClick={() => logOut()}>Вийти</Button>
                    </Nav>
                    :
                    <Nav className={classes.nav_components}>
                        <Button variant={"outline-primary"} onClick={() => history.push(LOGIN_ROUTE)}>Ввійти</Button>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;
