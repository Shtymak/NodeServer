import React, {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Col, Container, FormSelect, Image, Row} from "react-bootstrap";
import "../modules/DevicePage.css"
import {createRating, fetchOneDevice, fetchRating, fetchType} from "../http/deviceApi";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {ToastContainer, toast} from "react-toastify";
import {addToBasket} from "../http/basketAPI";


const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []})
    const [rating, setRating] = useState(0)
    const [type, setType] = useState({name: null})
    const {id} = useParams()
    const loadDevice = () => fetchOneDevice(id).then(data => setDevice(data))
    const loadRating = () => fetchRating(id).then(data => {
        setRating(data.rows / data.count)
    })
    const loadType = async () => fetchType().then(data => {
        const types = Array.from(data)
        console.log(id)
        console.log(device)
    })

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
        loadDevice()
        loadRating()
        loadType()

    }, [])

    return (
        <div>
            <Container className="box">
                <Row>
                    <Col md={4}>
                        <Image className="image" src={process.env.REACT_APP_API_URL + device.img}/>
                    </Col>
                    <Col md={4}>
                        {type.name}
                        <h1>{device.name}</h1>
                    </Col>
                    <Col md={4}>
                        Hello
                    </Col>
                </Row>
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
