import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import classes from "../modules/DeviceItem.module.css"
import star from "../assets/star.png"
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} className="mt-3" onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card className={classes._card}>
                <Image
                    src={device.img}
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
        </Col>
    );
};

export default DeviceItem;
