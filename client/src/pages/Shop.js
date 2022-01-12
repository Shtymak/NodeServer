import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchType} from "../http/deviceApi";

const Shop = observer(() => {
    const {device} = useContext(Context)
    const loadTypes = () => {
        fetchType().then(data => device.setTypes(data))
    }
    useEffect(() => fetchType().then(data => device.setTypes(data)), [])
    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
