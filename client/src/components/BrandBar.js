import React, {useContext} from 'react';
import {Card, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import classes from "../modules/BrandBar.module.css";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row>
            {device.brands.map(brand =>
                <Card
                    className={classes._item}
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
