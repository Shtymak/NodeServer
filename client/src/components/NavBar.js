import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import classes from "../modules/NavBar.module.css"
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink className={classes.main_link} to={SHOP_ROUTE}>Dodo</NavLink>
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
