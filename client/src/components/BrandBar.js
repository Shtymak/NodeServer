import React, {useContext} from 'react';
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import classes from "../modules/BrandBar.module.css";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ListGroup horizontal>
            {
                device.brands.map(brand =>
                    <ListGroup.Item
                        onClick={() => device.setSelectedBrand(brand)}
                        active={brand.id === device.selectedBrand.id}
                        key={brand.id}
                        className={classes._item}
                    >
                        {brand.name}
                    </ListGroup.Item>)
            }

        </ListGroup>
    );
});

export default BrandBar;
