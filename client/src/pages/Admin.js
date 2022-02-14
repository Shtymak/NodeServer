import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container} from "react-bootstrap";

const Admin = observer(() => {
    const {device} = useContext(Context)
    return (
        <div>
            <Container>

            </Container>
        </div>
    );
});

export default Admin;
