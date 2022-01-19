import React from 'react';
import classes from "../modules/BasketItem.module.css";
import {Card, Col, FormControl, Image, Row} from "react-bootstrap";
const BasketItem = ({device}) => {
    return (
        <Col className={classes.col}>
            <Card>
                <Row>
                    <Col md={3}>
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
            </Card>
        </Col>
    );
};

export default BasketItem;
