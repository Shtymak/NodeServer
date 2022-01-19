import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import classes from "../modules/DeviceItem.module.css"
import star from "../assets/star.png"
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} className="mt-3">
            <Card className={classes._card} onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>
                <Image
                    src={process.env.REACT_APP_API_URL + device.img}
                    className={classes._image}
                />
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div className="text-black-50 ">Apple</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star} className={classes.icon}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
            <div>
                <span className={classes._add_product}>
                     +
                </span>
            </div>
        </Col>
    );
};

export default DeviceItem;
