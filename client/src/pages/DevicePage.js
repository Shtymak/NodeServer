import React, {useContext, useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Col, Container, FormSelect, Image, Row} from "react-bootstrap";
import "../modules/DevicePage.css"
import {createRating, fetchOneDevice, fetchRating, fetchType} from "../http/deviceApi";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import star from "../assets/star.png"
import midstar from "../assets/midstar.png"
import lowstar from "../assets/lowstar.png"
import {ToastContainer, toast} from "react-toastify";
import {addToBasket} from "../http/basketAPI";
import StepRange from "../components/StepRange";
import {Context} from "../index";


const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []})
    const [rating, setRating] = useState(0)
    const {id} = useParams()
    const loadDevice = () => fetchOneDevice(id).then(data => setDevice(data))
    const loadRating = () => fetchRating(id).then(data => {
        setRating(data.rows / data.count)
    })
    let ratings = []
    const loadStars = () => {
        for (let i = 1; i <= 5; i++) {
            if (i <= device.rating)
                ratings.push(<Image src={star} className="star"/>)
            else
                ratings.push(<Image src={lowstar} className="star"/>)
        }
    }
    loadStars()

    const addRating = async () => {
        try {
            await createRating({
                deviceId: id,
                rate: rating
            }).then(() => loadDevice()).then(() => toast.info("Дякуюємо за оцінку ❤️"))
        } catch (e) {
            toast.error(`${e.response.data.message} ✅`)
        }
    }
    const addItem = () => {
        addToBasket(id).then(() => toast.success("Успішно додано", {}))
    }
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
                            {ratings}
                        </div>
                        <div>
                            <Button variant={"outline-dark"}
                                    className="addbtn"
                                    onClick={addItem}>Додати в кошик
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
                                        onClick={() => addRating()}> Оцінити!
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
// <Container className="mt-3">
//     <Row>
//         <Col md={4}>
//             <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
//         </Col>
//         <Col md={4}>
//             <Row className="d-flex flex-column align-items-center">
//                 <h2>{device.name}</h2>
//                 <div
//                     className="d-flex align-items-center justify-content-center"
//                     style={{
//                         background: `url(${star}) no-repeat center center`,
//                         width: 240,
//                         height: 240,
//                         backgroundSize: 'cover',
//                         fontSize: 64
//                     }}
//                 >
//                     {device.rating}
//                 </div>
//             </Row>
//         </Col>
//         <Col md={4}>
//             <Card
//                 className="d-flex flex-column align-items-center justify-content-around"
//                 style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
//             >
//                 <h3>От: {device.price} грн.</h3>
//                 <Button variant={"outline-dark"}
//                         onClick={addItem}>Додати в кошик</Button>
//             </Card>
//         </Col>
//     </Row>
//     <Row className="d-flex flex-column m-3">
//         <h1>Характеристики</h1>
//         {device.info.map((info, index) =>
//             <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
//                 {info.title}: {info.description}
//             </Row>
//         )}
//     </Row>
//     <Row className="d-flex flex-column m-3">
//         <h1>Оцінка: </h1>
//         <FormSelect onChange={e => setRating(e.target.value)}>
//             {ratings.map(rating =>
//                 <option value={rating}
//                         key={rating}>
//                     {rating}
//                 </option>)
//             }
//         </FormSelect>
//         <Button onClick={() => addRating()}>Оцінити!</Button>
//     </Row>
//     <ToastContainer/>
// </Container>

export default DevicePage;
