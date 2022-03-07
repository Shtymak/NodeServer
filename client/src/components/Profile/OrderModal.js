import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../http/userAPI";
import { Modal } from "react-bootstrap";
import OrderComponent from "./OrderComponent";

const OrderModal = observer(({ show, handleClose, setShowDevices }) => {
    const [orders, setOrders] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => getAllOrders()
        .then(({ count, devices }) => {
            setOrders(devices)
            setCount(count)
        }))
    return (<Modal show={show} onHide={() => handleClose(setShowDevices)}>
        {orders.map(x => <OrderComponent device={x} key={x.id}/> )}
    </Modal>)
});

export default OrderModal;
