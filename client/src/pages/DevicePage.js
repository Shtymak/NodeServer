import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, FormSelect, Image, Row} from "react-bootstrap";
import star from "../assets/star.png"
import {createRating, fetchOneDevice, fetchRating} from "../http/deviceApi";
import {useParams} from "react-router-dom";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []})
    const [rating, setRating] = useState(0)
    const ratings = [1, 2, 3, 4, 5]
    const {id} = useParams()
    const loadDevice = async () => (setDevice(await fetchOneDevice(id)))
    const loadRating = () => fetchRating(id).then(data => {
        setRating(data.rows / data.count)
    })
    const addRating = async () => {
        try {
            await createRating({deviceId: id, rate: rating}).then(() => loadDevice())
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    useEffect(() => {
        loadDevice()
        loadRating()
    }, [])
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${star}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: 'cover',
                                fontSize: 64
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} грн.</h3>
                        <Button variant={"outline-dark"}>Додати в кошик</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Оцінка: </h1>
                <FormSelect onChange={e => setRating(e.target.value)}>
                    {ratings.map(rating =>
                        <option value={rating}
                                key={rating}>
                            {rating}
                        </option>)
                    }
                </FormSelect>
                <Button onClick={() => addRating()}>Оцінити!</Button>
            </Row>
        </Container>
    );
});

export default DevicePage;
