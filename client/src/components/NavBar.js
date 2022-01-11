import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {SHOP_ROUTE} from "../utils/consts";
import classes from "../modules/NavBar.module.css"
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink className={classes.main_link} to={SHOP_ROUTE}>Dodo</NavLink>
                {user.isAuth ?
                    <Nav className={classes.nav_components}>
                        <Button variant={"outline-primary"}>Вийти</Button>
                    </Nav>
                    :
                    <Nav className={classes.nav_components}>
                        <Button variant={"outline-primary"}>Ввійти</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
