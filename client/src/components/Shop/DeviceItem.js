import React, {useContext} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import classes from "../../modules/DeviceItem.module.css"
import star from "../../assets/star.png"
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import addIcon from "../../assets/addToCart.png"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {addItem} from "../../helpers/basketHelper";

const DeviceItem = ({device}) => {
    const history = useHistory()
    const brands = useContext(Context).device.brands
    const {id} = device
    return (
        <Col md={3} className="mt-3">
            <Card className={classes._card}>
                <div onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img}
                        className={classes._image}
                    />
                    <div className="mt-1 d-flex justify-content-between align-items-center">
                        <div className="text-black-50 ">
                            {brands.filter(x =>
                                x.id === device.brandId).map(x =>
                                <div key={x.id}>{x.name}</div>)
                            }
                        </div>
                        <div className='d-flex align-items-center'>
                            <div>{device.rating}</div>
                            <Image src={star} className={classes.icon}/>
                        </div>
                    </div>
                </div>
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>
                        {device.name}
                    </div>
                    <div className='d-flex align-items-center'
                         onClick={() => addItem(id)}>
                        <Image className={classes._add_product}
                               src={addIcon}>
                        </Image>
                    </div>
                </div>
            </Card>
            <ToastContainer/>
        </Col>
    );
};

export default DeviceItem;
