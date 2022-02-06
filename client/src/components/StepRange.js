import React, {useState} from 'react';

const StepRange = ({steps, setRating, rating}) => {
    const [state, setState] = useState()

    const handleChange = e => {
        setState(getAdjustedValue(e.target.value));
        setRating(getAdjustedValue(e.target.value))
    }

    const getAdjustedValue = val => {
        return steps.reduce((p, c) =>
            Math.abs(p - val) < Math.abs(c - val) ? p : c
        );
    }
    const
        min = steps[0],
        max = steps[steps.length - 1];
    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={state || 1}
                onChange={handleChange}
            />
            <p>{state || 1}</p>
        </div>
    );
};

export default StepRange;
