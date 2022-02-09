import React, {useContext, useEffect, useState} from 'react';
import {Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {fetchBrand, fetchType} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";
import "../../modules/AddModal.css"
import deleteIcon from "../../assets/trash.png"
import {addDevice} from "../../helpers/dataHelper";

const AddDeviceModal = observer(({show, handleClose, hide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const addParams = {
        name,
        price,
        file,
        device,
        info,
        hide
    }
    useEffect(() => {
        fetchType().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
    }, [])
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    return (
        <Modal show={show}
               onHide={() => handleClose(hide)}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати товар 🐱‍💻
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="selectors-header">
                        <span>
                            Тип & Бренд
                        </span>

                        <div className="selectors">
                            <Dropdown className="mt-2 mb-2 drop" key="secondary">
                                <Dropdown.Toggle
                                    id="dropdown-button-dark-example1"
                                    variant="secondary">
                                    {device.selectedType.name || "Виберіть тип"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    {device.types.map(type =>
                                        <Dropdown.Item
                                            onClick={() => device.setSelectedType(type)}
                                            key={type.id}
                                        >
                                            {type.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="mt-2 mb-2 drop" key="secondary">
                                <Dropdown.Toggle
                                    id="dropdown-button-dark-example1"
                                    variant="secondary">
                                    {device.selectedBrand.name || "Виберіть бренд"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    {device.brands.map(brand =>
                                        <Dropdown.Item
                                            onClick={() => device.setSelectedBrand(brand)}
                                            key={brand.id}
                                        >
                                            {brand.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="forms-header">
                        <span>
                            Основні дані
                        </span>
                        <div className="forms">
                            <Form.Control
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="mt-3"
                                placeholder="Назва пристрою"
                            />
                            <Form.Control
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Вартість пристрою"
                                type="number"
                            />
                            <Form.Control
                                className="mt-3"
                                type="file"
                                onChange={selectFile}
                            />
                        </div>
                    </div>
                    <div className="props-header">
                        <div className="details">
                            <span>Деталі</span>
                            <h5 className="add-title" onClick={addInfo}>
                                Додати нову властивіть
                            </h5>
                        </div>
                        <div className="props">

                            {info.map(i =>
                                <Row className="mt-4 align-items-center" key={i.number}>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.title}
                                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                            placeholder="Введіть назву властивості"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.description}
                                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                            placeholder="Введіть опис властивості"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Image src={deleteIcon}
                                               onClick={() => removeInfo(i.number)}
                                               className="icon"
                                        />
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <h5 onClick={() => {
                    addDevice(addParams)
                    handleClose(hide)
                }}
                    className="add-title">Додати</h5>
            </Modal.Footer>
        </Modal>
    );
});
export default AddDeviceModal;
