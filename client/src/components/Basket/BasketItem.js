import React, {useState} from 'react';
import classes from "../../modules/BasketItem.module.css";
import {Image, Nav} from "react-bootstrap";
import {deleteFromBasket} from "../../http/basketAPI";
import {observer} from "mobx-react-lite";
import trashIcon from "../../assets/trash.png"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {DEVICE_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";
import down from "../../assets/down.png"
import up from "../../assets/up.png"
import {deleteDevice} from "../../helpers/basketHelper";

const BasketItem = observer(({device, deleteFromBasketList, setTotalPrice, total}) => {
    const history = useHistory()
    const [count, setCount] = useState(1)
    const deleteProps = {device, deleteFromBasketList, total, setTotalPrice, count}
    function downCount() {
        if (count > 1) {
            setCount(count - 1)
            setTotalPrice(total - device.price)
        }
    }

    return (
        <div>
            <div className={classes.show}>
                <div className={classes.photo}>
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img}
                        className={classes._image}
                    />
                </div>
                <div className={classes.title}>
                    <Nav.Link onClick={() =>
                        history.push(`${DEVICE_ROUTE}/${device.id}`)}>
                        {device.name}
                    </Nav.Link>
                </div>

                <div className={classes.text}>
                    {count * device.price}
                </div>

                <div className={classes.text2}>
                    <div className={classes.column}>
                        <span>
                            {count}
                        </span>
                    </div>
                    <div className={classes.column}>
                        <div className={classes.counters}>
                            <Image src={up}
                                   className={classes.count}
                                   onClick={() => {
                                       setCount(count + 1)
                                       setTotalPrice(total + device.price)
                                   }}/>
                            <Image src={down}
                                   className={classes.count}
                                   onClick={
                                       downCount
                                   }/>
                        </div>
                    </div>
                    <Image className={classes.icon}
                           onClick={() => deleteDevice(deleteProps)}
                           src={trashIcon}/>
                </div>
            </div>
            <ToastContainer/>
            <hr/>
        </div>
    );
});

export default BasketItem;
