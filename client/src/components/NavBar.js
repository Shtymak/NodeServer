import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";

const NavBar = () => {
    const {user} = useContext(Context)
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
