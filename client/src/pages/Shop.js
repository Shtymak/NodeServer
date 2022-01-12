import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType} from "../http/deviceApi";

const Shop = observer(() => {
    const {device} = useContext(Context)
    const loadTypes = () => fetchType().then(data => device.setTypes(data)) //promise
    const loadBrands = async () => device.setBrands(await fetchBrand())     //async
    const loadDevices = () => fetchDevice().then(data=>device.setDevices(data.rows))
    useEffect(() => {
        loadBrands()
        loadTypes()
        loadDevices()
    }, [])
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
