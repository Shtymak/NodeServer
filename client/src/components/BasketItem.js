import React, {useState} from 'react';
import classes from "../modules/BasketItem.module.css";
import {Card, Col, FormControl, Image, Row} from "react-bootstrap";
import {deleteFromBasket} from "../http/basketAPI";
import {observer} from "mobx-react-lite";
import trashIcon from "../assets/trash.png"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BasketItem = observer(({device, deleteFromBasketList, setTotalPrice, total}) => {

    const deleteDevice = async () => {
        await deleteFromBasket({deviceId: device.id})
        deleteFromBasketList(device.id)
        setTotalPrice(total - device.price * count)
        toast.error(`${device.name} видалено`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    let [count, setCount] = useState(1)
    return (
        <Col className={classes.col}>
            <Card className={classes.card}>
                <Row>
                    <Col md={3} className="d-flex align-items-center justify-content-center">
                        <Image
                            src={process.env.REACT_APP_API_URL + device.img}
                            className={classes._image}
                        />
                    </Col>
                    <Col md={6}>
                        {device.name}
                        <div>
                            Кількість:
                            <FormControl type="number"
                                         defaultValue={1}
                                         min={1}
                                         max={10}
                                         onChange={e => {
                                             setCount(e.target.value)
                                             setTotalPrice(total + device.price)
                                         }}/>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex">
                    Загальна вартість: {count * device.price}
                    <Image className={classes.icon} onClick={deleteDevice} src={trashIcon}/>
                </div>
            </Card>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </Col>
    );
});

export default BasketItem;
