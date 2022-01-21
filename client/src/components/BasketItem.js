import React from 'react';
import classes from "../modules/BasketItem.module.css";
import {Card, Col, FormControl, Image, Row} from "react-bootstrap";
import {deleteFromBasket} from "../http/basketAPI";
const BasketItem = ({device}) => {

    const deleteDevice = async () =>{
        deleteFromBasket({deviceId: device.id}).then(data=>alert("Видалено!"))
    }
    return (
        <Col className={classes.col}>
            <Card>
                <Row>
                    <Col md={3} className="d-flex align-items-center justify-content-center">
                        <Image
                            src={process.env.REACT_APP_API_URL + device.img}
                            className={classes._image}
                        />
                    </Col>
                    <Col md={6}>
                        {device.name}
                        Кількість: <FormControl type="number"/>
                    </Col>
                </Row>
                <span onClick={deleteDevice}>delete</span>
            </Card>
        </Col>
    );
};

export default BasketItem;
