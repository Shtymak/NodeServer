import React, {useContext, useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Col, Container, FormSelect, Image, Row} from "react-bootstrap";
import "../modules/DevicePage.css"
import {createRating, fetchOneDevice, fetchRating, fetchType} from "../http/deviceApi";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {ToastContainer, toast} from "react-toastify";
import {addToBasket} from "../http/basketAPI";
import StepRange from "../components/StepRange";
import {addRating, loadStars} from "../helpers/ratingHelper";
import {addItem} from "../helpers/basketHelper";


const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []})
    const [rating, setRating] = useState(0)
    const {id} = useParams()
    const loadDevice = () => fetchOneDevice(id).then(data => setDevice(data))
    const loadRating = () => fetchRating(id).then(data => {
        setRating(data.rows / data.count)
    })
    const stars = loadStars(device)

    useEffect(() => {
        loadDevice().then()
        loadRating().then()
    }, [])

    return (
        <div>
            <Container className="box">
                <Row>
                    <Col md={4}>
                        <Image className="image"
                               src={process.env.REACT_APP_API_URL + device.img}
                        />
                    </Col>
                    <Col md={4}>
                        <div className="attr">
                            <span className="title">Відкрив</span>
                            <span className="title">|</span>
                            <span className="title">Побачив</span>
                            <span className="title">|</span>
                            <span className="title">Купив</span>
                        </div>
                        <h1>{device.name}</h1>
                        <div className="attr">
                            <span className="price">
                                {device.price} грн
                            </span>
                        </div>
                        <div>
                            {stars}
                        </div>
                        <div>
                            <Button variant={"outline-dark"}
                                    className="addbtn"
                                    onClick={() =>
                                        addItem(id)}>
                                Додати в кошик
                            </Button>
                        </div>
                        <Row className="step">
                            <Col md={6} className="select">
                                <StepRange className="select"
                                           steps={[1, 2, 3, 4, 5]}
                                           setRating={setRating}
                                           rating={rating}/>
                            </Col>
                            <Col md={5}>
                                <Button variant={"outline-dark"}
                                        className="ratebtn"
                                        onClick={() =>
                                            addRating({
                                                id,
                                                rating,
                                                loadDevice
                                            })
                                        }>
                                    Оцінити!
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <div className="props">
                            <h1>Характеристики</h1>
                            {device.info.length > 0 ?
                                device.info.map((info, index) =>
                                    <Row key={info.id}
                                         style={{
                                             background: index % 2 === 0 ? 'lightgray' : 'transparent',
                                             padding: 10
                                         }}>
                                        {info.title}: {info.description}
                                    </Row>
                                ) :
                                <div>Подробиці поки відсутні 🤔</div>}
                        </div>
                    </Col>
                </Row>
                <ToastContainer/>
            </Container>
        </div>
    );
});


export default DevicePage;
