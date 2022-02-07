/**
 * @param props{{e: React.ChangeEvent<HTMLInputElement>, setState: (value: (((prevState: undefined) => undefined) | undefined)) => void, setRating}}
 */
export function handleChange(props) {
    const {e, setState, setRating, steps} = props
    const params = { value: e.target.value, steps: steps}
    setState(getAdjustedValue(params));
    setRating(getAdjustedValue(params))
}

function getAdjustedValue(props) {
    const {value, steps} = props
    return steps.reduce((p, c) =>
        Math.abs(p - value) < Math.abs(c - value) ? p : c
    );
}
