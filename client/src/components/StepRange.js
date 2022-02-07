import React, {useState} from 'react';
import "../modules/Range.css"
import {handleChange} from "../helpers/rangeHelper";

const StepRange = ({steps, setRating, rating}) => {
    const [state, setState] = useState()
    const
        min = steps[0],
        max = steps[steps.length - 1];
    const handleChangeParams = {setState, setRating, steps}
    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={state || 1}
                onChange={e => handleChange({e, ...handleChangeParams})}
            />
            <div>Поточна оцінка: {state || 1}</div>
        </div>
    );
};

export default StepRange;
