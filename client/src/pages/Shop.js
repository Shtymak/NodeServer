import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/Shop/TypeBar";
import BrandBar from "../components/Shop/BrandBar";
import DeviceList from "../components/Shop/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType} from "../http/deviceApi";
import {check} from "../http/userAPI";

const Shop = observer(() => {
    const {device, user} = useContext(Context)
    const loadUser = () => check().then(data=>{
        user.setUser(data)
        user.setIsAuth(true)
    })
    const loadTypes = () => fetchType().then(data => device.setTypes(data)) //promise
    const loadBrands = async () => device.setBrands(await fetchBrand())     //async
    const loadDevices = () => fetchDevice(device.selectedBrand.id, device.selectedType.id).then(data=>device.setDevices(data.rows))
    useEffect(() => {
        loadBrands()
        loadTypes()
        loadDevices()
        loadUser()
    }, [device.selectedBrand, device.selectedType])
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
