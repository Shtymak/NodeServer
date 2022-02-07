import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/Shop/TypeBar";
import BrandBar from "../components/Shop/BrandBar";
import DeviceList from "../components/Shop/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType} from "../http/deviceApi";
import {check} from "../http/userAPI";
import {Fab} from "@mui/material";
import basket from "../assets/basket2.png"
import {BASKET_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import "../modules/Shop.css"
import {fab} from "../utils/style"

const Shop = observer(() => {
    const {device, user} = useContext(Context)
    const history  = useHistory()
    const loadUser = () => check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    })
    const loadTypes = () => fetchType().then(data => device.setTypes(data)) //promise
    const loadBrands = async () => device.setBrands(await fetchBrand())     //async
    const loadDevices = () => fetchDevice(device.selectedBrand.id, device.selectedType.id).then(data => device.setDevices(data.rows))
    useEffect(() => {
        loadBrands().then()
        loadTypes().then()
        loadDevices().then()
        loadUser().then()
    }, [device.selectedBrand, device.selectedType])
    return (
        <div className="shop">
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
            <Fab style={fab} aria-label="add" onClick={() => history.push(BASKET_ROUTE)}>
                <img src={basket} style={{height: "50%", width: "50%"}} alt="basket"/>
            </Fab>
        </div>
    );
});

export default Shop;
