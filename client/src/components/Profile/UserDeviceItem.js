import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import classes from "../../modules/UserDeviceItem.module.css"
import {DEVICE_ROUTE} from "../../utils/consts";
import {NavLink} from "react-router-dom";
import remove from "../../assets/remove.png"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {observer} from "mobx-react-lite";

const UserDeviceItem = observer(({device, removeItem}) => {
    const deleteItem = async (device) => {
        let deleted = window.confirm("Дійсно хочете видалити?")
        if (deleted) {
            await removeItem(device)
            toast.error(`${device.name} видалено`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success("Ваш товар у безпеці 💖",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }
    }
    return (
        <Col md={12} className={classes.content}>
            <Card className={classes.card}>
                <div className={classes.column}>
                    <Image src={process.env.REACT_APP_API_URL + device.img} className={classes.icon}/>
                    <div className={classes.column}>
                        <NavLink to={`${DEVICE_ROUTE}/${device.id}`}>{device.name}</NavLink>
                    </div>
                    <Image src={remove} className={classes.remove} onClick={() => deleteItem(device)}/>
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

export default UserDeviceItem;
