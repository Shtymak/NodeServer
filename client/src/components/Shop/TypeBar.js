import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import classes from "../../modules/TypeBar.module.css"
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    const selectType = (type) => {
        if (device.selectedType.id === type.id)
            device.setSelectedType(0)
        else
            device.setSelectedType(type)
    }
    return (
        <ListGroup as="ul">
            {
                device.types.map(type =>
                    <ListGroup.Item
                        className={classes._item}
                        active={device.selectedType.id === type.id}
                        onClick={() => selectType(type)}
                        key={`#${type.id}`}
                    >
                        {type.name}
                    </ListGroup.Item>)}
        </ListGroup>
    );
});

export default TypeBar;
